package com.gamebroadcast.forum.review;

import com.gamebroadcast.forum.article.Article;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "review")
@Data
public class Review extends Article {

    private Double score;
    private String prosConsPath;
    // Game id ?????

    public Review() {
    }

    public Review(String title, String introduction, String contentPath,
                  Double score, String prosConsPath) {
        super(title, introduction, contentPath);
        this.score = score;
        this.prosConsPath = prosConsPath;
    }

    public Review(Long id, String title, String introduction, String contentPath,
                Double score, String prosConsPath) {
        super(id, title, introduction, contentPath);
        this.score = score;
        this.prosConsPath = prosConsPath;
    }
}
