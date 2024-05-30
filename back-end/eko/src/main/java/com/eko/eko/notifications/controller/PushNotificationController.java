package com.eko.eko.notifications.controller;

import java.util.List;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.notifications.model.Notification;
import com.eko.eko.notifications.service.PushNotificationService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RequestMapping("/api/push-notifications")
@RestController
@RequiredArgsConstructor
public class PushNotificationController {
    private final PushNotificationService service;

    @GetMapping("/{userID}")
    public Flux<ServerSentEvent<List<Notification>>> streamLastMessage(@PathVariable int userID) {
        return service.getNotificationsByUserToID(userID);
    }
}
