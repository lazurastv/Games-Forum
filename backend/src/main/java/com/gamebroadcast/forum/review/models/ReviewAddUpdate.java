package com.gamebroadcast.forum.review.models;

import java.util.List;

import com.gamebroadcast.forum.article.models.ArticleAddUpdate;

public class ReviewAddUpdate extends ArticleAddUpdate {
    public int score;
    public List<String> pluses;
    public List<String> minuses;

    public Review toReview(String path) {
        Review review = new Review();
        update(review);
        review.setPath(path);
        return review;
    }

    public void update(Review review) {
        review.setTitle(title);
        review.setIntroduction(introduction);
        review.setScore(score);
        review.setPluses(pluses);
        review.setMinuses(minuses);
    }
}
