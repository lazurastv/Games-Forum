package com.gamebroadcast.forum.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketChatController {

    @MessageMapping("/send")
    @SendTo("/chat/message")
    public ChatMessageVM sendMessage(@Payload ChatMessageVM chatMessageVM) {
        return chatMessageVM;
    }
}