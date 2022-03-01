package com.gamebroadcast.forum.game.models;

import java.util.Date;

import com.gamebroadcast.forum.article.models.ArticleAddUpdate;

public class GameAddUpdate extends ArticleAddUpdate {
    public Date gamePublishDate;
    public String developer;
    public Double editorScore;

    public Game toGame(String path) {
        return new Game(title, introduction, path, gamePublishDate, developer, editorScore);
    }

    public void update(Game game) {
        update(game);
        game.setGamePublishDate(gamePublishDate);
        game.setDeveloper(developer);
        game.setEditorScore(editorScore);
    }
}
