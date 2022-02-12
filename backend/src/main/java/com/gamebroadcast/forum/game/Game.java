package com.gamebroadcast.forum.game;

import com.gamebroadcast.forum.article.Article;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "game")
@Data
public class Game extends Article {

    Date publishDate;
    String developer;
    Double editorScore;
    Double userScore;

    public Game() {
    }

    public Game(String title, String introduction, String contentPath, String imagePath,
                Date publishDate, String Developer, Double editorScore, Double userScore) {
        super(title, introduction, contentPath, imagePath);
        this.publishDate = publishDate;
        this.developer = Developer;
        this.editorScore = editorScore;
        this.userScore = userScore;
    }

    public Game(Long id, String title, String introduction, String contentPath, String imagePath,
                Date publishDate, String Developer, Double editorScore, Double userScore) {
        super(id, title, introduction, contentPath, imagePath);
        this.publishDate = publishDate;
        this.developer = Developer;
        this.editorScore = editorScore;
        this.userScore = userScore;
    }
}
