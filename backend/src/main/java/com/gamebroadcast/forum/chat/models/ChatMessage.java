package com.gamebroadcast.forum.chat.models;

import java.util.Date;

import javax.persistence.*;

import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

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
    private Date publishDate;

    public void publish() {
        this.author = SessionUtils.getUserFromSession();
        this.publishDate = new Date();
    }

    public boolean ownedBy(AppUser user) {
        return this.author.getId().equals(user.getId());
    }

    public boolean ownedBy(Long id) {
        return this.author.getId().equals(id);
    }
}
