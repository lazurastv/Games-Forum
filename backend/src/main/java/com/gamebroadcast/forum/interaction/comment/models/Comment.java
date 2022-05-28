package com.gamebroadcast.forum.interaction.comment.models;

import java.time.Instant;
import java.util.Date;

import javax.persistence.*;

import com.gamebroadcast.forum.content.content.Content;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "comments")
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @SequenceGenerator(name = "comment_sequence", sequenceName = "comment_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id", nullable = false)
    private Content content;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private AppUser author;

    @Column
    private Date publishDate;

    @Column(length = 2048, nullable = false)
    private String comment;

    public void publish() {
        author = SessionUtils.getUserFromSession();
        publishDate = Date.from(Instant.now());
    }

    public boolean ownedBy(AppUser user) {
        return this.author.getId().equals(user.getId());
    }

    public boolean ownedBy(Long id) {
        return this.author.getId().equals(id);
    }
}
