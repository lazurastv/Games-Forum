package com.gamebroadcast.forum.interaction.like.models;

import javax.persistence.*;

import com.gamebroadcast.forum.article.models.Article;
import com.gamebroadcast.forum.user.AppUser;

import lombok.Data;

@Entity
@Data
@Table(name = "likes")
public class Like {
    @Id
    @SequenceGenerator(name = "like_sequence", sequenceName = "like_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "like_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @Column
    private boolean isLike;

    public Like() {
    }

    public Like(Article article, AppUser user, boolean isLike) {
        this.article = article;
        this.user = user;
        this.isLike = isLike;
    }

    public boolean isLike() {
        return isLike;
    }

    public void toggleLike() {
        this.isLike = !this.isLike;
    }

    public boolean ownedBy(AppUser user) {
        return this.user.getId().equals(user.getId());
    }
}
