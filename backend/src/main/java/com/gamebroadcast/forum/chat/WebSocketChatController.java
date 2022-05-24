package com.gamebroadcast.forum.chat;

import java.time.Instant;
import java.util.Date;

import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketChatController {
    @MessageMapping("/send")
    @SendTo("/topic/message")
    public ChatMessageVM sendMessage(@Payload ChatMessageAdd chatMessageAdd) {
        ChatMessageVM chatMessageVM = new ChatMessageVM();
        // AppUser user = SessionUtils.getUserFromSession();
        // chatMessageVM.authorId = user.getId();
        // chatMessageVM.authorName = user.getUsername();
        chatMessageVM.message = chatMessageAdd.message;
        // chatMessageVM.profilePicturePath = user.getProfilePicturePath();
        // chatMessageVM.publishDate = Date.from(Instant.now());
        return chatMessageVM;
    }
}