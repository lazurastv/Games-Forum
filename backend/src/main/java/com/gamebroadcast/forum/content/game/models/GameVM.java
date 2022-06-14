package com.gamebroadcast.forum.content.game.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.content.content.ContentVM;

public class GameVM extends ContentVM {
    public String introduction;

    public GameVM(Game game) {
        super(game);
        introduction = game.getIntroduction();
    }

    public static List<GameVM> toGameVMList(List<Game> games) {
        List<GameVM> gameVMs = new ArrayList<>();
        games.forEach(game -> gameVMs.add(new GameVM(game)));
        return gameVMs;
    }
}
