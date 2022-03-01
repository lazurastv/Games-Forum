package com.gamebroadcast.forum.review.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.*;

import com.gamebroadcast.forum.article.models.Article;

@Entity
@Table(name = "review")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Review extends Article {

    @Column
    private int score;

    @ElementCollection
    private List<String> pluses;

    @ElementCollection
    private List<String> minuses;

    public Review(String title, String introduction, String path, int score, List<String> pluses,
            List<String> minuses) {
        super(title, introduction, path);
        this.setScore(score);
        this.pluses = pluses;
        this.minuses = minuses;
    }

    public void setScore(int score) {
        if (score < 1 || score > 10) {
            throw new IllegalArgumentException("Score must be between 1 and 10.");
        }
        this.score = score;
    }
}
