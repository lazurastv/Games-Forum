package com.gamebroadcast.forum.content.game.models;

import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.content.content.ContentAddUpdate;

public class GameAddUpdate extends ContentAddUpdate {
    public Date gamePublishDate;
    public String developer;
    public Double editorScore;
    public List<String> genres;
    public List<String> platforms;
    public List<String> distributions;

    public Game toGame(String path) {
        Game game = new Game(path);
        update(game);
        return game;
    }

    public void update(Game game) {
        super.update(game);
        game.setGamePublishDate(gamePublishDate);
        game.setDeveloper(developer);
        game.setEditorScore(editorScore);
        game.setGenres(genres);
        game.setPlatforms(platforms);
        game.setDistributions(distributions);
    }
}
