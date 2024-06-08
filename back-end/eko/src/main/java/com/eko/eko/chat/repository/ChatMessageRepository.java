package com.eko.eko.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eko.eko.chat.model.ChatMessage;
import com.eko.eko.chat.model.MessageStatus;

import java.util.List;

public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Integer> {

    long countBySenderIdAndRecipientIdAndStatus(
            int senderId, int recipientId, MessageStatus status);

    List<ChatMessage> findByChatId(String chatId);

    List<ChatMessage> findBySenderIdAndRecipientId(int senderId, int recipientId);
}
