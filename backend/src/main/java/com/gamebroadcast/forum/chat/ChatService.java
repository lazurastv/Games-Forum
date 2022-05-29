package com.gamebroadcast.forum.chat;

import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.chat.models.ChatMessage;
import com.gamebroadcast.forum.chat.models.ChatMessageAdd;
import com.gamebroadcast.forum.chat.models.ChatMessageVM;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.user.UserService;
import com.gamebroadcast.forum.user.schemas.AppUser;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserService userService;
    private Date lastClear;

    public List<ChatMessageVM> getAll() {
        Date currentDate = new Date();
        long milisecondsInDay = 24 * 60 * 60 * 1000;
        Date yesterday = new Date(currentDate.getTime() - milisecondsInDay);
        if (lastClear == null || lastClear.before(yesterday)) {
            if (lastClear == null) {
                lastClear = yesterday;
            }
            clearOldMessages();
        }

        List<ChatMessage> chatMessages = chatRepository.findAll();
        return ChatMessageVM.toChatMessageVMList(chatMessages);
    }

    public ChatMessageVM add(ChatMessageAdd chatMessageAdd, Long authorId) throws IllegalStateException {
        ChatMessage chatMessage = chatMessageAdd.toChatMessage();
        AppUser user = userService.getUser(authorId);
        chatMessage.publish(user);
        chatRepository.save(chatMessage);
        return new ChatMessageVM(chatMessage);
    }

    public void delete(Long id) throws IllegalStateException {
        ChatMessage chatMessage = getChatMessage(id);
        chatRepository.delete(chatMessage);
    }

    public ChatMessage getChatMessage(Long id) {
        return chatRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Message", id));
    }

    @Transactional
    private void clearOldMessages() {
        chatRepository.deleteByPublishDateLessThan(lastClear);
        lastClear = new Date();
    }
}
