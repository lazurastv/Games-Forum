package com.gamebroadcast.forum.review.models;

import java.util.List;

import com.gamebroadcast.forum.article.models.ArticleAddUpdate;

public class ReviewAddUpdate extends ArticleAddUpdate {
    public int score;
    public List<String> pluses;
    public List<String> minuses;

    public Review toReview(String path) {
        return new Review(title, introduction, path, score, pluses, minuses);
    }

    public void update(Review review) {
        update(review);
        review.setScore(score);
        review.setPluses(pluses);
        review.setMinuses(minuses);
    }
}
