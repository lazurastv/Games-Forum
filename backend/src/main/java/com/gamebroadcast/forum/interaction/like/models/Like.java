package com.gamebroadcast.forum.interaction.like.models;

import javax.persistence.*;

import com.gamebroadcast.forum.content.content.Content;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "likes")
@AllArgsConstructor
@NoArgsConstructor
public class Like {
    @Id
    @SequenceGenerator(name = "like_sequence", sequenceName = "like_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "like_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private AppUser author;

    @Column
    private boolean isLike;

    public void publish() {
        author = SessionUtils.getUserFromSession();
    }

    public boolean isLike() {
        return isLike;
    }

    public void toggleLike() {
        this.isLike = !this.isLike;
    }

    public boolean ownedBy(AppUser user) {
        return this.author.getId().equals(user.getId());
    }
}
