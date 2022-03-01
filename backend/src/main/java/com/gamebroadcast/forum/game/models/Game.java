package com.gamebroadcast.forum.game.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.gamebroadcast.forum.article.models.Article;
import com.gamebroadcast.forum.interaction.rating.models.Rating;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "game")
@Data
@EqualsAndHashCode(callSuper = true)
public class Game extends Article {

    @Column
    private Date gamePublishDate;

    @Column
    private String developer;

    @Column
    private Double editorScore;

    @OneToMany
    private List<Rating> ratings;

    public Game(String title, String introduction, String path, Date gamePublishDate, String developer,
            Double editorScore) {
        super(title, introduction, path);
        this.gamePublishDate = gamePublishDate;
        this.developer = developer;
        this.editorScore = editorScore;
    }

    public Double calculateUserScore() {
        Double score = 0.0;
        for (Rating rating : ratings) {
            score += rating.getValue();
        }
        score /= ratings.size();
        return score;
    }
}
