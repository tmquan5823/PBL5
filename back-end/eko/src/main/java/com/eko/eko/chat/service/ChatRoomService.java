package com.eko.eko.chat.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eko.eko.chat.model.ChatRoom;
import com.eko.eko.chat.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private ChatRoomRepository chatRoomRepository;

    public Optional<String> getChatId(
            int senderId, int recipientId, boolean createIfNotExist) {

        return chatRoomRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    if (!createIfNotExist) {
                        return Optional.empty();
                    }
                    var chatId = String.format("%s_%s", senderId, recipientId);

                    ChatRoom senderRecipient = ChatRoom
                            .builder()
                            .chatId(chatId)
                            .senderId(senderId)
                            .recipientId(recipientId)
                            .build();

                    ChatRoom recipientSender = ChatRoom
                            .builder()
                            .chatId(chatId)
                            .senderId(recipientId)
                            .recipientId(senderId)
                            .build();
                    chatRoomRepository.save(senderRecipient);
                    chatRoomRepository.save(recipientSender);

                    return Optional.of(chatId);
                });
    }
}
