package com.eko.eko.notifications.service;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;

import com.eko.eko.notifications.model.Notification;
import com.eko.eko.notifications.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PushNotificationService {

    private final NotificationRepository notificationRepository;

    private List<Notification> getNotifs(int userID) {
        var notifs = notificationRepository.findByRecipientId(userID);
        return notifs;
    }

    public Flux<ServerSentEvent<List<Notification>>> getNotificationsByUserToID(int userID) {

        if (userID > 0) {
            return Flux.interval(Duration.ofSeconds(3))
                    .publishOn(Schedulers.boundedElastic())
                    .map(sequence -> ServerSentEvent.<List<Notification>>builder().id(String.valueOf(sequence))
                            .event("user-list-event").data(getNotifs(userID))
                            .build());
        }

        return Flux.interval(Duration.ofSeconds(1)).map(sequence -> ServerSentEvent.<List<Notification>>builder()
                .id(String.valueOf(sequence)).event("user-list-event").data(new ArrayList<>()).build());
    }
}