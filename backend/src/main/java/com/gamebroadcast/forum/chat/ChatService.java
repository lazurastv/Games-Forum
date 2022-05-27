package com.gamebroadcast.forum.chat;

import java.util.List;

import com.gamebroadcast.forum.chat.models.ChatMessage;
import com.gamebroadcast.forum.chat.models.ChatMessageVM;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
    public final ChatRepository chatRepository;

    public List<ChatMessageVM> getAll() {
        List<ChatMessage> chatMessages = chatRepository.findAll();
        return ChatMessageVM.toChatMessageVMList(chatMessages);
    }
}
