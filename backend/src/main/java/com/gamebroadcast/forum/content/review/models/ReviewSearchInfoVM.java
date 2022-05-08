package com.gamebroadcast.forum.content.review.models;

import java.util.ArrayList;
import java.util.List;

public class ReviewSearchInfoVM extends ReviewVM {
    public String introduction;
    public double score;
    public int popularity;

    public ReviewSearchInfoVM(Review review) {
        super(review);
        score = review.getScore();
        introduction = review.getIntroduction();
        popularity = review.getLikeCount() + review.getDislikeCount();
    }

    public static List<ReviewSearchInfoVM> toReviewSearchInfoVMList(List<Review> reviews) {
        List<ReviewSearchInfoVM> reviewSearchInfoVM = new ArrayList<>();
        reviews.forEach(review -> reviewSearchInfoVM.add(new ReviewSearchInfoVM(review)));
        return reviewSearchInfoVM;
    }
}
