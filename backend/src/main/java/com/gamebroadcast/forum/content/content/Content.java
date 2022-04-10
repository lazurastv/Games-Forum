package com.gamebroadcast.forum.content.content;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.gamebroadcast.forum.interaction.comment.models.Comment;
import com.gamebroadcast.forum.interaction.like.models.Like;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "content", uniqueConstraints = {
        @UniqueConstraint(name = "content_unique_title", columnNames = "title") })
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@AllArgsConstructor
@NoArgsConstructor
public class Content {
    @Id
    @SequenceGenerator(name = "content_sequence", sequenceName = "content_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "content_sequence")
    @Column(updatable = false)
    protected Long id;

    @Column
    protected String title;

    @Column(length = 2048)
    protected String introduction;

    @Column
    protected String path;

    @Column
    protected Date publishDate;

    @ManyToOne
    @JoinColumn(name = "author_id")
    protected AppUser author;

    @OneToMany(mappedBy = "content")
    protected List<Like> likes;

    @OneToMany(mappedBy = "content")
    protected List<Comment> comments;

    public Content(String path) {
        this.path = path;
    }

    public void publish() {
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
