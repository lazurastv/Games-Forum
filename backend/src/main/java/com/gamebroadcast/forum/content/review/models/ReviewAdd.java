package com.gamebroadcast.forum.content.review.models;

import com.gamebroadcast.forum.content.game.models.Game;
import com.gamebroadcast.forum.exceptions.RequiredValueException;

public class ReviewAdd extends ReviewUpdate {
    public Long gameId;

    public Review toReview(Game game) {
        Review review = new Review(game);
        update(review);
        return review;
    }

    public void verify() {
        if (gameId == null) {
            throw new RequiredValueException("gameId");
        }
        super.verify();
    }
}
