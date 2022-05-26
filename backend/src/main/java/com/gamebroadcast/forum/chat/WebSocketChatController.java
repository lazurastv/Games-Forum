package com.gamebroadcast.forum.chat;

import java.time.Instant;
import java.util.Date;

import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketChatController {

    @MessageMapping("/send")
    public void sendMessage(@Payload ChatMessageAdd chatMessageAdd) {
        ChatMessageVM chatMessageVM = new ChatMessageVM();
        AppUser user = SessionUtils.getUserFromSession();
        chatMessageVM.authorId = user.getId();
        chatMessageVM.authorName = user.getUsername();
        chatMessageVM.message = chatMessageAdd.message;
        chatMessageVM.profilePicturePath = user.getProfilePicturePath();
        chatMessageVM.publishDate = Date.from(Instant.now());
        broadcastMessage(chatMessageVM);
    }

    @SendToUser("/topic/message")
    public ChatMessageVM broadcastMessage(ChatMessageVM chatMessageVM) {
        return chatMessageVM;
    }
}