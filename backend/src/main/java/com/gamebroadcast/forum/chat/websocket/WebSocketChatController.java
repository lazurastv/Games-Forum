package com.gamebroadcast.forum.chat.websocket;

import com.gamebroadcast.forum.chat.ChatService;
import com.gamebroadcast.forum.chat.models.ChatMessageAdd;
import com.gamebroadcast.forum.chat.models.ChatUser;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSocketChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/send")
    public void sendMessage(@Payload ChatMessageAdd chatMessageAdd, StompHeaderAccessor headerAccessor) {
        ChatUser user = (ChatUser) headerAccessor.getUser();

        if (user == null) {
            return;
        }

        messagingTemplate.convertAndSend("/topic/message",
                chatService.add(chatMessageAdd, user.getId()));
    }
}