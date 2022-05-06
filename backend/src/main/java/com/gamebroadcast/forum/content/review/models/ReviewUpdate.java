package com.gamebroadcast.forum.content.review.models;

import java.util.List;

import com.gamebroadcast.forum.content.content.ContentAddUpdate;
import com.gamebroadcast.forum.exceptions.RequiredValueException;

public class ReviewUpdate extends ContentAddUpdate {
    public Double score;
    public List<String> pluses;
    public List<String> minuses;

    public void update(Review review) {
        verify();
        super.update(review);
        review.setScore(score);
        review.setPluses(pluses);
        review.setMinuses(minuses);
    }

    public void verify() {
        if (score == null) {
            throw new RequiredValueException("score");
        }
    }
}
