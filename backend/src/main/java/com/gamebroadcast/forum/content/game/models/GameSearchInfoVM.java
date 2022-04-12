package com.gamebroadcast.forum.content.game.models;

import java.util.ArrayList;
import java.util.List;

public class GameSearchInfoVM extends GameVM{

    public Double meanScore;

    public GameSearchInfoVM(Game game) {
        super(game);
        meanScore = game.calculateUserScore();
    }

    public static List<GameSearchInfoVM> toGameSearchInfoVMList(List<Game> games) {
        List<GameSearchInfoVM> gameSearchInfoVM = new ArrayList<>();
        games.forEach(game -> gameSearchInfoVM.add(new GameSearchInfoVM(game)));
        return gameSearchInfoVM;
    }
}
