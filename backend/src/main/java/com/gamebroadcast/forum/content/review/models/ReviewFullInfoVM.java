package com.gamebroadcast.forum.content.review.models;

import java.util.List;

import com.gamebroadcast.forum.content.content.ContentFullInfoVM;
import com.gamebroadcast.forum.content.game.models.GameVM;

public class ReviewFullInfoVM extends ContentFullInfoVM {
    public int score;
    public GameVM game;
    public List<String> pluses;
    public List<String> minuses;

    public ReviewFullInfoVM(Review review) {
        super(review);
        score = review.getScore();
        game = new GameVM(review.getGame());
        pluses = review.getPluses();
        minuses = review.getMinuses();
    }
}
