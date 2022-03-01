package com.gamebroadcast.forum.article.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.gamebroadcast.forum.interaction.comment.models.Comment;
import com.gamebroadcast.forum.interaction.like.models.Like;
import com.gamebroadcast.forum.security.SessionUtils;
import com.gamebroadcast.forum.user.AppUser;

@Entity
@Data
@Table(name = "article", uniqueConstraints = {
        @UniqueConstraint(name = "article_unique_title", columnNames = "title") })
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
public class Article {

    @Id
    @SequenceGenerator(name = "article_sequence", sequenceName = "article_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_sequence")
    @Column(updatable = false)
    private Long id;

    @Column
    private String title;

    @Column(length = 2048)
    private String introduction;

    @Column
    private String path;

    @Column
    private Date publishDate;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private AppUser author;

    @OneToMany(mappedBy = "article")
    private List<Like> likes;

    @OneToMany(mappedBy = "article")
    private List<Comment> comments;

    public Article(String title, String introduction, String path) {
        this.title = title;
        this.introduction = introduction;
        this.path = path;
        this.publishDate = new Date();
        this.author = SessionUtils.getUserFromSession();
    }

    public int getLikeCount() {
        return Collections.frequency(likes, true);
    }

    public int getDislikeCount() {
        return Collections.frequency(likes, false);
    }

    public boolean ownedBy(AppUser user) {
        return this.author.getId().equals(user.getId());
    }
}
