package com.gamebroadcast.forum.content.review.models;

import com.gamebroadcast.forum.content.game.models.Game;

public class ReviewAdd extends ReviewUpdate {
    public Long gameId;

    public Review toReview(String path, Game game) {
        Review review = new Review(path, game);
        update(review);
        return review;
    }
}
