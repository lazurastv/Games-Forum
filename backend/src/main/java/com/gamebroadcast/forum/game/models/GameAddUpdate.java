package com.gamebroadcast.forum.game.models;

import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.article.models.ArticleAddUpdate;

public class GameAddUpdate extends ArticleAddUpdate {
    public Date gamePublishDate;
    public String developer;
    public Double editorScore;
    public List<String> genres;
    public List<String> platforms;
    public List<String> distributions;

    public Game toGame(String path) {
        Game game = new Game();
        update(game);
        game.setPath(path);
        return game;
    }

    public void update(Game game) {
        game.setTitle(title);
        game.setIntroduction(introduction);
        game.setGamePublishDate(gamePublishDate);
        game.setDeveloper(developer);
        game.setEditorScore(editorScore);
        game.setGenres(genres);
        game.setPlatforms(platforms);
        game.setDistributions(distributions);
    }
}
