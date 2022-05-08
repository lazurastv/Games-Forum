package com.gamebroadcast.forum.content.game.models;

import java.util.ArrayList;
import java.util.List;

public class GameSearchInfoVM extends GameVM {
    public String introduction;
    public Double meanUserScore;
    public String developer;
    public Double editorScore;
    public int popularity;
    public List<String> genres;
    public List<String> platforms;
    public List<String> distributions;

    public GameSearchInfoVM(Game game) {
        super(game);
        introduction = game.getIntroduction();
        meanUserScore = game.calculateUserScore();
        developer = game.getDeveloper();
        editorScore = game.getEditorScore();
        popularity = game.getLikeCount() + game.getDislikeCount();
        genres = game.getGenres();
        platforms = game.getPlatforms();
        distributions = game.getDistributions();
    }

    public static List<GameSearchInfoVM> toGameSearchInfoVMList(List<Game> games) {
        List<GameSearchInfoVM> gameSearchInfoVM = new ArrayList<>();
        games.forEach(game -> gameSearchInfoVM.add(new GameSearchInfoVM(game)));
        return gameSearchInfoVM;
    }
}
