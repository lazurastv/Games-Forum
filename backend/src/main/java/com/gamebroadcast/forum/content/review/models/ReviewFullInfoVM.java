package com.gamebroadcast.forum.content.review.models;

import java.util.List;

import com.gamebroadcast.forum.content.content.ContentFullInfoVM;

public class ReviewFullInfoVM extends ContentFullInfoVM {
    public int score;
    public List<String> pluses;
    public List<String> minuses;

    public ReviewFullInfoVM(Review review) {
        super(review);
        score = review.getScore();
        pluses = review.getPluses();
        minuses = review.getMinuses();
    }
}
