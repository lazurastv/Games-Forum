package com.gamebroadcast.forum.article.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.gamebroadcast.forum.interaction.like.models.Like;
import com.gamebroadcast.forum.user.schemas.AppUser;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "article", uniqueConstraints = {
        @UniqueConstraint(name = "article_unique_title", columnNames = "title") })
@NoArgsConstructor
public class Article extends ArticleType {

    @Id
    @SequenceGenerator(name = "article_sequence", sequenceName = "article_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_sequence")
    @Column(updatable = false)
    private Long id;

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
