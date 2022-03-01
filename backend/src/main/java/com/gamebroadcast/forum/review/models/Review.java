package com.gamebroadcast.forum.review.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

    @Column(length = 2048)
    private String plusMinusJSON;

    public Review(String title, String introduction, String path, int score, String plusMinusJSON) {
        super(title, introduction, path);
        this.score = score;
        this.plusMinusJSON = plusMinusJSON;
    }
}
