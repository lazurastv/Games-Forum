package com.gamebroadcast.forum.content.game.models;

import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.content.content.ContentAddUpdate;
import com.gamebroadcast.forum.exceptions.RequiredValueException;

public class GameAddUpdate extends ContentAddUpdate {
    public Date gamePublishDate;
    public String developer;
    public Double editorScore;
    public List<String> genres;
    public List<String> platforms;
    public List<String> distributions;

    public Game toGame() {
        Game game = new Game();
        update(game);
        return game;
    }

    public void update(Game game) {
        verify();
        super.update(game);
        game.setGamePublishDate(gamePublishDate);
        game.setDeveloper(developer);
        game.setEditorScore(editorScore);
        game.setGenres(genres);
        game.setPlatforms(platforms);
        game.setDistributions(distributions);
    }

    public void verify() {
        String field = "";
        if (gamePublishDate == null) {
            field = "gamePublishDate";
        } else if (developer == null) {
            field = "developer";
        } else if (editorScore == null) {
            field = "editorScore";
        }
        if (field != "") {
            throw new RequiredValueException(field);
        }
    }
}
