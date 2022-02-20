package com.gamebroadcast.forum.interaction.comment.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @Column(length = 2048)
    private String content;

    public Comment() {
    }

    public Comment(Article article, AppUser user, String content) {
        this.article = article;
        this.user = user;
        this.content = content;
    }

    public boolean ownedBy(AppUser user) {
        return this.user.getId().equals(user.getId());
    }

    public boolean ownedBy(Long id) {
        return this.user.getId().equals(id);
    }
}
