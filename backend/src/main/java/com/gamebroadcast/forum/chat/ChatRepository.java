package com.gamebroadcast.forum.chat;

import java.util.Date;

import com.gamebroadcast.forum.chat.models.ChatMessage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatMessage, Long>{

    public void deleteByPublishDateLessThan(Date currentDate);   
}
