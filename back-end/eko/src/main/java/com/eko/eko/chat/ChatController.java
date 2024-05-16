package com.eko.eko.chat;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private SimpMessagingTemplate messagingTemplate;
    private ChatService chatService;

    // @PostMapping("/send")
    // public ResponseEntity<Chat> sendMessage(@RequestBody)
}
