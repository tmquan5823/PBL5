package com.eko.eko.chat.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eko.eko.chat.dto.ListChatRoomResponse;
import com.eko.eko.chat.model.ChatMessage;
import com.eko.eko.chat.model.ChatRoom;
import com.eko.eko.chat.repository.ChatRoomRepository;
import com.eko.eko.chat.service.ChatRoomService;
import com.eko.eko.notifications.model.Notification;
import com.eko.eko.notifications.model.NotificationType;
import com.eko.eko.notifications.repository.NotificationRepository;
import com.eko.eko.user.entity.Role;
import com.eko.eko.user.entity.User;
import com.eko.eko.user.repository.UserRepository;
import com.eko.eko.util.JsonConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.eko.eko.chat.service.ChatMessageService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatController {
        private final SimpMessagingTemplate messagingTemplate;
        private final ChatMessageService chatMessageService;
        private final ChatRoomService chatRoomService;
        private final JsonConverter jsonConverter;
        private final UserRepository userRepository;
        private final ChatRoomRepository chatRoomRepository;
        private final NotificationRepository notificationRepository;

        @MessageMapping("/chat")
        public void processMessage(@Payload ChatMessage chatMessage) throws JsonProcessingException {
                var chatId = chatRoomService
                                .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
                chatMessage.setChatId(chatId.get());
                ChatMessage saved = chatMessageService.save(chatMessage);
                List<ChatRoom> chatRooms = chatRoomRepository.findByChatId(chatId.get());
                for (ChatRoom chatRoom : chatRooms) {
                        if (chatRoom.getSenderId() == saved.getSenderId())
                                chatRoom.setContent("Bạn: " + saved.getContent());
                        else
                                chatRoom.setContent(saved.getContent());
                        chatRoom.setTimeStamp(LocalDateTime.now());
                        if (chatMessageService.countNewMessages(chatRoom.getRecipientId(), chatRoom.getSenderId()) > 0)
                                chatRoom.setHaveUnreadMessage(true);
                        else
                                chatRoom.setHaveUnreadMessage(false);
                        chatRoomRepository.save(chatRoom);
                }

                String notifQuery = "\"id\" : " + saved.getRecipientId() + ",";
                var notif = notificationRepository.findByIdAndType(notifQuery, NotificationType.CHAT);
                User senderUser = userRepository.findById(saved.getSenderId()).orElseThrow();
                if (notif == null) {
                        notif = Notification.builder()
                                        .recipientId(saved.getRecipientId())
                                        .senderId(saved.getSenderId())
                                        .chatId(saved.getId())
                                        .content("Có " + chatMessageService.countNewMessages(saved.getSenderId(),
                                                        saved.getRecipientId()) + " tin nhắn mới từ ")
                                        // findById
                                        // get name ra
                                        .object(jsonConverter.convertObjectToJson(
                                                        userRepository.findById(saved.getRecipientId()).orElseThrow()))
                                        .notificationType(NotificationType.CHAT)
                                        .isRead(false)
                                        .timeStamp(LocalDateTime.now())
                                        .build();
                        if (senderUser.getRole() == Role.ADMIN)
                                notif.setContent(notif.getContent() + "ADMIN!!!");
                        else
                                notif.setContent(notif.getContent() + senderUser.getFirstname() + " "
                                                + senderUser.getLastname() + "!!!");
                        notificationRepository.save(notif);
                } else {
                        notif.setContent("Có " + chatMessageService.countNewMessages(saved.getSenderId(),
                                        saved.getRecipientId()) + " tin nhắn mới từ ");
                        notif.setTimeStamp(LocalDateTime.now());
                        notif.setRead(false);
                        if (senderUser.getRole() == Role.ADMIN)
                                notif.setContent(notif.getContent() + "ADMIN!!!");
                        else
                                notif.setContent(notif.getContent() + senderUser.getFirstname() + " "
                                                + senderUser.getLastname() + "!!!");
                        notificationRepository.save(notif);
                }

                // Lưu thông báo vào cơ sở dữ liệu
                messagingTemplate.convertAndSendToUser(
                                Integer.toString(chatMessage.getRecipientId()), "/queue/messages",
                                chatMessage);
        }

        // Lay chat room
        @GetMapping("/chat/chatroom/{senderId}")
        public ResponseEntity<ListChatRoomResponse> getListChatRoom(
                        @PathVariable int senderId) {
                return ResponseEntity.ok(chatMessageService.getListChatRoom(senderId));
        }

        // @GetMapping("/chat/messages/{senderId}/{recipientId}/count")
        // public ResponseEntity<Long> countNewMessages(
        // @PathVariable int senderId,
        // @PathVariable int recipientId) {

        // return ResponseEntity
        // .ok(chatMessageService.countNewMessages(senderId, recipientId));
        // }

        @GetMapping("/chat/messages/{senderId}/{recipientId}")
        public ResponseEntity<?> findChatMessages(@PathVariable int senderId,
                        @PathVariable int recipientId) {
                return ResponseEntity
                                .ok(chatMessageService.findChatMessages(senderId, recipientId));
        }

        @GetMapping("/chat/message/{id}")
        public ResponseEntity<?> findMessage(@PathVariable int id) {
                return ResponseEntity
                                .ok(chatMessageService.findById(id));
        }
}
