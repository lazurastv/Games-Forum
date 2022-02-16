package com.gamebroadcast.forum.interaction;

import javax.persistence.*;

import com.gamebroadcast.forum.article.Article;
import com.gamebroadcast.forum.user.User;

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

    // @ManyToOne
    // @JoinColumn(name = "user_id")
    // private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(length = 2048)
    private String content;

    public Comment() {
    }

    public Comment(Article article, String content) {
        this.article = article;
        this.content = content;
    }
}
