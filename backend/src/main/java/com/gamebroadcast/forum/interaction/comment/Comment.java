package com.gamebroadcast.forum.interaction.comment;

import javax.persistence.*;

import com.gamebroadcast.forum.article.Article;
import com.gamebroadcast.forum.user.AppUser;

import lombok.Data;

@Entity
@Data
@Table(name = "comments")
public class Comment {
    @Id
    @SequenceGenerator(name = "comment_sequence", sequenceName = "comment_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(length = 2048)
    private String content;

    public Comment() {
    }

    public Comment(String content) {
        this.content = content;
    }
}
