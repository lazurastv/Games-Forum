package com.gamebroadcast.forum.chat.models;

import java.sql.Timestamp;

import javax.persistence.*;

import com.gamebroadcast.forum.user.schemas.AppUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "chat_messages")
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    @Id
    @SequenceGenerator(name = "comment_sequence", sequenceName = "comment_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private AppUser author;

    @Column(name = "message", nullable = false, length = 1024)
    private String message;

    @Column(name = "last_used", nullable = false)
    private Timestamp publishDate;
}
