package com.eko.eko.notifications.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eko.eko.notifications.model.Notification;
import com.eko.eko.notifications.model.NotificationType;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    Optional<Notification> findById(int id);

    Notification findByContent(String content);

    @Query("SELECT n FROM Notification n WHERE n.recipientId = :recipientId ORDER BY n.timeStamp DESC")
    List<Notification> findByRecipientId(int recipientId);

    @Query("SELECT n FROM Notification n WHERE n.object LIKE %:budgetId% AND n.notificationType = :notificationType")
    Notification findByIdAndType(@Param("budgetId") String id,
            @Param("notificationType") NotificationType notificationType);

}
