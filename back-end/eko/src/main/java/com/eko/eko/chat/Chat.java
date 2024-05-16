package com.eko.eko.chat;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Chat {
    @Id
    private long id;
    private String chatId;
    private int senderId;
    private int recipientId;
    private String content;
    LocalDateTime timeStamp;
}
