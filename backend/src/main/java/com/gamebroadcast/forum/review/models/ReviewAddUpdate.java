package com.gamebroadcast.forum.review.models;

import com.gamebroadcast.forum.article.models.ArticleAddUpdate;

public class ReviewAddUpdate extends ArticleAddUpdate {
    public int score;
    public String plusMinusJSON;

    public Review toReview(String path) {
        return new Review(title, introduction, path, score, plusMinusJSON);
    }

    public void update(Review review) {
        update(review);
        review.setScore(score);
        review.setPlusMinusJSON(plusMinusJSON);
    }
}
