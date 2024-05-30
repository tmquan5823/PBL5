package com.eko.eko.notifications.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.notifications.dto.NotificationResponse;
import com.eko.eko.notifications.model.Notification;
import com.eko.eko.notifications.service.NotificationService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/notification/")
@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notifService;

    @GetMapping("/{userID}")
    public ResponseEntity<List<Notification>> getNotificationsByUserID(@PathVariable int userID) {
        return ResponseEntity.ok(notifService.getNotificationsByUserID(userID));
    }

    @PatchMapping("/read/{notifID}")
    public ResponseEntity<NotificationResponse> changeNotifStatusToRead(@PathVariable int notifID,
            HttpServletRequest request) {
        return notifService.changeNotifStatusToRead(notifID, request);
    }
}
