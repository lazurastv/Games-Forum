package com.gamebroadcast.forum.chat.models;

import java.util.Date;

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
    @SequenceGenerator(name = "chat_sequence", sequenceName = "chat_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private AppUser author;

    @Column(name = "message", nullable = false, length = 1024)
    private String message;

    @Column(name = "publish_date", nullable = false)
    private Date publishDate;

    public void publish(AppUser author) {
        this.author = author;
        this.publishDate = new Date();
    }

    public boolean ownedBy(AppUser user) {
        return this.author.getId().equals(user.getId());
    }

    public boolean ownedBy(Long id) {
        return this.author.getId().equals(id);
    }
}
