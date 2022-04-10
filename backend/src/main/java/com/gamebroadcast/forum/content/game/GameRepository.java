package com.gamebroadcast.forum.content.game;

import java.util.List;

import com.gamebroadcast.forum.content.content.ContentRepository;
import com.gamebroadcast.forum.content.game.models.Game;

public interface GameRepository extends ContentRepository<Game> {

    List<Game> findByGenres(String genre);
}
