package com.gamebroadcast.forum.content.review.models;

import java.util.List;

import com.gamebroadcast.forum.content.content.ContentAddUpdate;

public class ReviewUpdate extends ContentAddUpdate {
    public int score;
    public List<String> pluses;
    public List<String> minuses;

    public void update(Review review) {
        super.update(review);
        review.setScore(score);
        review.setPluses(pluses);
        review.setMinuses(minuses);
    }
}
