package com.gamebroadcast.forum.chat;

import com.gamebroadcast.forum.chat.models.ChatMessage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatMessage, Long>{
    
}
