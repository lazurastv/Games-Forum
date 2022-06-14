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
    private Double score;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ElementCollection
    private List<String> pluses;

    @ElementCollection
    private List<String> minuses;

    public Review(Game game) {
        super();
        this.game = game;
    }

    public void setScore(Double score) {
        if (score < 1 || score > 10) {
            throw new RuntimeException("Ocena gry musi być w zakresie od 1 do 10");
        }
        this.score = score;
    }
}
