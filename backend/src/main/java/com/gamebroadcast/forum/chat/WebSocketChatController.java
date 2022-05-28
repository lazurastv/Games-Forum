package com.gamebroadcast.forum.chat;

import java.time.Instant;
import java.util.Date;

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

    @MessageMapping("/send")
    public void sendMessage(@Payload ChatMessageAdd chatMessageAdd, StompHeaderAccessor headerAccessor) {
        ChatUser user = (ChatUser) headerAccessor.getUser();

        if (user == null) {
            return;
        }

        ChatMessageVM chatMessageVM = new ChatMessageVM();
        chatMessageVM.authorId = user.getId();
        chatMessageVM.authorName = user.getName();
        chatMessageVM.message = chatMessageAdd.message;
        chatMessageVM.profilePicturePath = user.getProfilePicturePath();
        chatMessageVM.publishDate = Date.from(Instant.now());
        messagingTemplate.convertAndSend("/topic/message", chatMessageVM);
    }
}