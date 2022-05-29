package com.gamebroadcast.forum.chat.models;

public class ChatMessageAdd {
    public String message;

    public ChatMessage toChatMessage() {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessage(message);
        return chatMessage;
    }
}
