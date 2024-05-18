package com.eko.eko.chat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eko.eko.chat.model.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(int senderId, int recipientId);
}
