package com.eko.eko.chat.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

import com.eko.eko.chat.exception.ResourceNotFoundException;
import com.eko.eko.chat.model.ChatMessage;
import com.eko.eko.chat.repository.ChatMessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private ChatMessageRepository repository;
    private ChatRoomService chatRoomService;

    public ChatMessage save(ChatMessage chatMessage) {
        repository.save(chatMessage);
        return chatMessage;
    }

    public long countNewMessages(int senderId, int recipientId) {
        return repository.countBySenderIdAndRecipientId(
                senderId, recipientId);
    }

    public List<ChatMessage> findChatMessages(int senderId, int recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId, false);

        var messages = chatId.map(cId -> repository.findByChatId(cId)).orElse(new ArrayList<>());

        return messages;
    }

    public ChatMessage findById(long id) {
        return repository
                .findById(id)
                .map(chatMessage -> {
                    return repository.save(chatMessage);
                })
                .orElseThrow(() -> new ResourceNotFoundException("can't find message (" + id + ")"));
    }
}
