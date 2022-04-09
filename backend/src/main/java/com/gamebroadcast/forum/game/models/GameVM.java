package com.gamebroadcast.forum.game.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.article.models.Article;
import com.gamebroadcast.forum.article.models.ArticleVM;

public class GameVM extends ArticleVM {
    public GameVM(Game game) {
        super(new Article());
        id = game.getId();
        title = game.getTitle();
        path = game.getPath();
        publishDate = game.getPublishDate();
        authorName = game.getAuthor().getUsername();
    }

    public static List<GameVM> toGameVMList(List<Game> games) {
        List<GameVM> gameVMs = new ArrayList<>();
        games.forEach(game -> gameVMs.add(new GameVM(game)));
        return gameVMs;
    }
}
