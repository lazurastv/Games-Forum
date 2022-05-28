package com.gamebroadcast.forum.chat;

import com.gamebroadcast.forum.user.schemas.AppUser;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketInterceptor implements ChannelInterceptor {
    private final ChatController chatController;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        String token = accessor.getFirstNativeHeader("token");

        switch (accessor.getCommand()) {
            case CONNECT:
                AppUser user = chatController.get(token);

                if (user == null) {
                    return null;
                }

                accessor.setUser(new ChatUser(user));
                // accessor.setLeaveMutable(true); maybe to change after login?
                break;
            case DISCONNECT:
                chatController.removeSession();
                break;
            default:
                break;
        }

        return message;
    }
}