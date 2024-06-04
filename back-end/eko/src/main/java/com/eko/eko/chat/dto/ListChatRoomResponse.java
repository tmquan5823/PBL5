package com.eko.eko.chat.dto;

import java.util.List;

import com.eko.eko.chat.model.ChatRoom;
import com.eko.eko.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListChatRoomResponse {
    private List<ChatRoomResponse> chatRooms;
    private String message;
    private boolean state;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatRoomResponse {
        private ChatRoom chatRoom;
        private User sender;
        private User recipient; 
    }
}
