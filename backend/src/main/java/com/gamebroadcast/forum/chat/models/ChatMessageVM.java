package com.gamebroadcast.forum.chat.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ChatMessageVM {
    public Long authorId;
    public String authorName;
    public String message;
    public Date publishDate;
    public String profilePicturePath;

    public ChatMessageVM(ChatMessage chat) {
        this.authorId = chat.getAuthor().getId();
        this.authorName = chat.getAuthor().getUsername();
        this.message = chat.getMessage();
        this.publishDate = chat.getPublishDate();
        this.profilePicturePath = chat.getAuthor().getProfilePicturePath();
    }

    public static List<ChatMessageVM> toChatMessageVMList(List<ChatMessage> chatMessages) {
        List<ChatMessageVM> chatMessageVMs = new ArrayList<>();
        chatMessages.forEach(chatMessage -> chatMessageVMs.add(new ChatMessageVM(chatMessage)));
        return chatMessageVMs;
    }
}
