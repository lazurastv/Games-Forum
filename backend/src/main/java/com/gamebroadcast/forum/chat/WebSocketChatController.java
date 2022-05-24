package com.gamebroadcast.forum.chat;

import java.time.Instant;
import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketChatController {

    @MessageMapping("/send")
    @SendTo("/chat/message")
    public ChatMessageVM sendMessage(@Payload ChatMessageAdd chatMessageAdd) {
        ChatMessageVM chatMessageVM = new ChatMessageVM();
        chatMessageVM.authorId = Long.valueOf(0);
        chatMessageVM.message = chatMessageAdd.message;
        chatMessageVM.profilePicturePath = "lalala";
        chatMessageVM.publishDate = Date.from(Instant.now());

        return chatMessageVM;
    }
}