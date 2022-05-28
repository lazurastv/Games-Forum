package com.gamebroadcast.forum.chat;

import java.util.List;

import com.gamebroadcast.forum.chat.models.ChatMessage;
import com.gamebroadcast.forum.chat.models.ChatMessageAdd;
import com.gamebroadcast.forum.chat.models.ChatMessageVM;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
    public final ChatRepository chatRepository;

    public void add(ChatMessageAdd chatMessageAdd) throws IllegalStateException {
        ChatMessage chatMessage = chatMessageAdd.toChatMessage();
        chatMessage.publish();
        chatRepository.save(chatMessage);
    }

    public void delete(Long id) throws IllegalStateException {
        ChatMessage chatMessage = getChatMessage(id);
        chatRepository.delete(chatMessage);
    }

    public List<ChatMessageVM> getAll() {
        List<ChatMessage> chatMessages = chatRepository.findAll();
        return ChatMessageVM.toChatMessageVMList(chatMessages);
    }

    public ChatMessage getChatMessage(Long id) {
        return chatRepository.findById(id)
            .orElseThrow(() -> new ItemNotFoundException("Message", id));
    }
}
