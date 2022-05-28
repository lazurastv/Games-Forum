package com.gamebroadcast.forum.chat;

import java.util.Date;
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
    private Date lastClear;

    public List<ChatMessageVM> getAll() {

        Date currentDate = new Date();
        Date yesterday = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24);
        if (lastClear == null || lastClear.before(yesterday)) {
            clearOldMessages();
        }

        List<ChatMessage> chatMessages = chatRepository.findAll();
        return ChatMessageVM.toChatMessageVMList(chatMessages);
    }

    public void add(ChatMessageAdd chatMessageAdd) throws IllegalStateException {
        ChatMessage chatMessage = chatMessageAdd.toChatMessage();
        chatMessage.publish();
        chatRepository.save(chatMessage);
    }

    public void delete(Long id) throws IllegalStateException {
        ChatMessage chatMessage = getChatMessage(id);
        chatRepository.delete(chatMessage);
    }


    public ChatMessage getChatMessage(Long id) {
        return chatRepository.findById(id)
            .orElseThrow(() -> new ItemNotFoundException("Message", id));
    }

    private void clearOldMessages() {
        chatRepository.deleteByPublishDateLessThan(lastClear);
        lastClear = new Date();
    }
}
