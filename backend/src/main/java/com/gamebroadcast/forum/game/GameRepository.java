package com.gamebroadcast.forum.game;

import java.util.List;

import com.gamebroadcast.forum.article.ArticleRepository;
import com.gamebroadcast.forum.game.models.Game;

public interface GameRepository extends ArticleRepository<Game> {

    List<Game> findByGenres(String genre);
}
