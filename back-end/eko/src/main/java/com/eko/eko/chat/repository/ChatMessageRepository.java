package com.eko.eko.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eko.eko.chat.model.ChatMessage;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    long countBySenderIdAndRecipientId(int senderId, int recipientId);

    List<ChatMessage> findByChatId(String chatId);
}
