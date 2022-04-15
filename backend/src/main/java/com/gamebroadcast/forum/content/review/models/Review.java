package com.gamebroadcast.forum.content.review.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.*;

import com.gamebroadcast.forum.content.content.Content;
import com.gamebroadcast.forum.content.game.models.Game;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("R")
@NoArgsConstructor
public class Review extends Content {
    @Column
    private int score;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ElementCollection
    private List<String> pluses;

    @ElementCollection
    private List<String> minuses;

    public Review(String path, Game game) {
        super(path);
        this.game = game;
    }

    public void setScore(int score) {
        if (score < 1 || score > 10) {
            throw new IllegalArgumentException("Score must be between 1 and 10.");
        }
        this.score = score;
    }
}
