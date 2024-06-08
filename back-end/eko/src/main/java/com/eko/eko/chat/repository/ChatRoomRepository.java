package com.eko.eko.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eko.eko.chat.model.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(int senderId, int recipientId);

    @Query("SELECT cr FROM ChatRoom cr WHERE cr.senderId = :senderId ORDER BY cr.timeStamp DESC")
    List<ChatRoom> findBySenderId(int senderId);

    List<ChatRoom> findByChatId(String chat_id);
}
