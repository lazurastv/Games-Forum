package com.gamebroadcast.forum.game.models;

import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.article.models.ArticleFullInfoVM;

public class GameFullInfoVM extends ArticleFullInfoVM {
    public Date gamePublishDate;
    public String developer;
    public Double editorScore;
    public Double userScore;
    public List<String> genres;
    public List<String> platforms;
    public List<String> distributions;

    public GameFullInfoVM(Game game) {
        super(game);
        gamePublishDate = game.getGamePublishDate();
        developer = game.getDeveloper();
        editorScore = game.getEditorScore();
        userScore = game.calculateUserScore();
        genres = game.getGenres();
        platforms = game.getPlatforms();
        distributions = game.getDistributions();
    }
}
