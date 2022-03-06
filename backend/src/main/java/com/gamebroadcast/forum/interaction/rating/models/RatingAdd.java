package com.gamebroadcast.forum.interaction.rating.models;

import com.gamebroadcast.forum.game.models.Game;

public class RatingAdd {
    public Long gameId;
    public int value;

    public Rating toRating(Game game) {
        return new Rating(game, value);
    }

    public boolean checkValue(int value) {
        return (value >= 1 && value <= 10);
    }
}
