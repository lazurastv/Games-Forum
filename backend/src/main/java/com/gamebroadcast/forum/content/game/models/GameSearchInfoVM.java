package com.gamebroadcast.forum.content.game.models;

import java.util.ArrayList;
import java.util.List;

public class GameSearchInfoVM extends GameVM{

    public Double meanUserScore;
    public String developer;
    public List<String> genres;
    public Double editorScore;
    public int popularity;

    public GameSearchInfoVM(Game game) {
        super(game);
        meanUserScore = game.calculateUserScore();
        developer = game.getDeveloper();
        genres = game.getGenres();
        editorScore = game.getEditorScore();
        this.popularity = game.getLikeCount() + game.getDislikeCount();
    }

    public static List<GameSearchInfoVM> toGameSearchInfoVMList(List<Game> games) {
        List<GameSearchInfoVM> gameSearchInfoVM = new ArrayList<>();
        games.forEach(game -> gameSearchInfoVM.add(new GameSearchInfoVM(game)));
        return gameSearchInfoVM;
    }
}
