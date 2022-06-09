package com.gamebroadcast.forum.interaction.rating.models;

import com.gamebroadcast.forum.content.game.models.Game;

public class RatingAdd {
    public Long gameId;
    public int value;

    public Rating toRating(Game game) {
        Rating rating = new Rating();
        rating.setGame(game);
        rating.setValue(value);
        return rating;
    }
}
