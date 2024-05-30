package com.eko.eko.notifications.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eko.eko.config.JwtService;
import com.eko.eko.money.dto.BudgetResponse;
import com.eko.eko.money.model.Budget;
import com.eko.eko.money.repository.BudgetRepository;
import com.eko.eko.money.repository.TransactionRepository;
import com.eko.eko.notifications.dto.NotificationResponse;
import com.eko.eko.notifications.model.Notification;
import com.eko.eko.notifications.model.NotificationType;
import com.eko.eko.notifications.repository.NotificationRepository;
import com.eko.eko.user.entity.User;
import com.eko.eko.util.JsonConverter;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final JsonConverter jsonConverter;
    private final JwtService jwtService;

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification getNotificationsByID(int id) {
        return notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("notification not found!"));
    }

    public List<Notification> getNotificationsByUserID(int userID) {
        return notificationRepository.findByRecipientId(userID);
    }

    public ResponseEntity<NotificationResponse> changeNotifStatusToRead(int notifID, HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                return new ResponseEntity<>(NotificationResponse.builder().state(false)
                        .message("Không tìm thấy người dùng hoặc lỗi token!!!").build(), HttpStatus.OK);
            }
            var notif = notificationRepository.findById(notifID)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy thông báo!"));
            notif.setRead(true);
            if (notif.getNotificationType() == NotificationType.BUDGET) {
                String budgetJsonString = notif.getObject();
                Budget budget = jsonConverter.convertStringToBudget(budgetJsonString);
                var findBudget = budgetRepository.findById(budget.getId());
                if (!findBudget.isPresent())
                    return new ResponseEntity<>(NotificationResponse.builder().state(false)
                            .message("Không tìm thấy ngân sách tương ứng!!!").build(), HttpStatus.OK);
            }
            notificationRepository.save(notif);
            return new ResponseEntity<>(NotificationResponse.builder().state(true)
                    .notification(notif)
                    .message("Đọc thông báo thành công!!!").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(NotificationResponse.builder().state(false)
                    .message("Lỗi đọc thông báo!!!").build(), HttpStatus.OK);
        }
    }

    public void clear() {
        notificationRepository.deleteAll();
    }
}
