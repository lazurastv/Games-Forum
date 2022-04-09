package com.gamebroadcast.forum.game;

import java.util.List;

import com.gamebroadcast.forum.article.ArticleTypeRepository;
import com.gamebroadcast.forum.game.models.Game;

public interface GameRepository extends ArticleTypeRepository<Game> {

    List<Game> findByGenres(String genre);
}
