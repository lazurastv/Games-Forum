package com.gamebroadcast.forum.content.review.models;

import java.util.ArrayList;
import java.util.List;

public class ReviewSearchInfoVM extends ReviewVM{

    public int popularity;
    public double score;
    public String introduction;

    public ReviewSearchInfoVM(Review review) {
        super(review);
        this.popularity = review.getLikeCount() + review.getDislikeCount();
        this.score = review.getScore();
        this.introduction = review.getIntroduction();
    }

    public static List<ReviewSearchInfoVM> toReviewSearchInfoVMList(List<Review> reviews) {
        List<ReviewSearchInfoVM> reviewSearchInfoVM = new ArrayList<>();
        reviews.forEach(review -> reviewSearchInfoVM.add(new ReviewSearchInfoVM(review)));
        return reviewSearchInfoVM;
    }
}
