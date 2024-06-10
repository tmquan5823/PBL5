package com.eko.eko.chat.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eko.eko.chat.dto.ListChatRoomResponse;
import com.eko.eko.chat.dto.ListChatRoomResponse.ChatRoomResponse;
import com.eko.eko.chat.exception.ResourceNotFoundException;
import com.eko.eko.chat.model.ChatMessage;
import com.eko.eko.chat.model.ChatRoom;
import com.eko.eko.chat.model.MessageStatus;
import com.eko.eko.chat.repository.ChatMessageRepository;
import com.eko.eko.chat.repository.ChatRoomRepository;
import com.eko.eko.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository repository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;
    private final UserRepository userRepository;

    public ChatMessage save(ChatMessage chatMessage) {
        chatMessage.setStatus(MessageStatus.RECEIVED);
        return repository.save(chatMessage);
    }

    public long countNewMessages(int senderId, int recipientId) {
        return repository.countBySenderIdAndRecipientIdAndStatus(senderId, recipientId, MessageStatus.RECEIVED);
    }

    public List<ChatMessage> findChatMessages(int senderId, int recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId, false);
        var messages = chatId.map(cId -> repository.findByChatId(cId)).orElse(new ArrayList<>());
        if (!messages.isEmpty()) {
            updateStatuses(recipientId, senderId, MessageStatus.DELIVERED);
        }
        return messages;
    }

    public ChatMessage findById(int id) {
        return repository.findById(id)
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.DELIVERED);
                    return repository.save(chatMessage);
                })
                .orElseThrow(() -> new ResourceNotFoundException("can't find message (" + id + ")"));
    }

    public void updateStatuses(int senderId, int recipientId, MessageStatus status) {
        List<ChatMessage> messages = repository.findBySenderIdAndRecipientId(senderId, recipientId);
        messages.forEach(message -> {
            message.setStatus(status);
            repository.save(message);
        });
    }

    public ListChatRoomResponse getListChatRoom(int senderId) {
        List<ChatRoom> chatRooms = chatRoomRepository.findBySenderId(senderId);
        if (chatRooms.size() == 0)
            return null;

        List<ChatRoomResponse> chatRoomResponses = new ArrayList<>();

        for (ChatRoom chatRoom : chatRooms) {
            if (countNewMessages(chatRoom.getRecipientId(), chatRoom.getSenderId()) > 0)
                chatRoom.setHaveUnreadMessage(true);
            else
                chatRoom.setHaveUnreadMessage(false);
            chatRoomRepository.save(chatRoom);
            ChatRoomResponse temp = ChatRoomResponse.builder()
                    .chatRoom(chatRoom)
                    .recipient(userRepository.findById(chatRoom.getRecipientId()).orElseThrow())
                    .sender(userRepository.findById(chatRoom.getSenderId()).orElseThrow())
                    .build();

            chatRoomResponses.add(temp);
        }

        return ListChatRoomResponse.builder()
                .chatRooms(chatRoomResponses)
                .state(true)
                .message("Lấy phòng chat thành công!!!")
                .build();

    }
}
