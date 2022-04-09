package com.gamebroadcast.forum.article.models;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.gamebroadcast.forum.interaction.comment.models.Comment;
import com.gamebroadcast.forum.interaction.like.models.Like;
import com.gamebroadcast.forum.utils.SessionUtils;

import lombok.Data;

import com.gamebroadcast.forum.user.schemas.AppUser;

@Data
@MappedSuperclass
public class ArticleType {
    @Column
    String title;

    @Column(length = 2048)
    String introduction;

    @Column
    String path;

    @Column
    Date publishDate;

    @ManyToOne
    @JoinColumn(name = "author_id")
    AppUser author;

    @OneToMany(mappedBy = "article")
    List<Like> likes;

    @OneToMany(mappedBy = "article")
    List<Comment> comments;

    public ArticleType() {
        this.publishDate = new Date();
        this.author = SessionUtils.getUserFromSession();
    }

    public int getLikeCount() {
        int count = 0;
        for (Like like : likes) {
            if (like.isLike()) {
                count++;
            }
        }
        return count;
    }

    public int getDislikeCount() {
        return likes.size() - getLikeCount();
    }

    public boolean ownedBy(AppUser user) {
        return this.author.getId().equals(user.getId());
    }
}
