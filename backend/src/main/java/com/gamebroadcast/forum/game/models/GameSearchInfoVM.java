package com.gamebroadcast.forum.game.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.article.models.ArticleSearchInfoVM;

public class GameSearchInfoVM extends ArticleSearchInfoVM{

    public List<String> genres;
    public List<String> platforms;
    public List<String> distributions;
    public Double meanScore;

    public GameSearchInfoVM(Game game) {
        super(game);
        id = game.getId();
        genres = game.getGenres();
        platforms = game.getPlatforms();
        distributions = game.getDistributions();
        meanScore = game.calculateUserScore();
    }

    public static List<GameSearchInfoVM> toGameVMList(List<Game> games) {
        List<GameSearchInfoVM> gameSearchInfoVM = new ArrayList<>();
        games.forEach(game -> gameSearchInfoVM.add(new GameSearchInfoVM(game)));
        return gameSearchInfoVM;
    }
}
