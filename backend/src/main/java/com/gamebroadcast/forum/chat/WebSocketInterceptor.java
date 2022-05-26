package com.gamebroadcast.forum.chat;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Service;

@Service
public class WebSocketInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String token = accessor.getFirstNativeHeader("sessionId");

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            System.out.println(token);
        }
        // validate and convert to a Principal based on your own requirements e.g.
        // authenticationManager.authenticate(JwtAuthentication(token))
        // Principal yourAuth = loginFilter.attemptAuthentication(request, response);

        // accessor.setUser(yourAuth);

        // not documented anywhere but necessary otherwise NPE in
        // StompSubProtocolHandler!
        // accessor.setLeaveMutable(true);
        return message;
    }
}