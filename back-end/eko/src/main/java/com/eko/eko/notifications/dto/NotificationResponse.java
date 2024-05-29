package com.eko.eko.notifications.dto;

import java.time.LocalDateTime;

import com.eko.eko.notifications.model.Notification;
import com.eko.eko.notifications.model.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private Notification notification;
    private String message;
    private boolean state;
}
