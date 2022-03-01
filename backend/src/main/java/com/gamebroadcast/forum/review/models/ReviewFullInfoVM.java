package com.gamebroadcast.forum.review.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.article.models.ArticleFullInfoVM;

public class ReviewFullInfoVM extends ArticleFullInfoVM {
    public String plusMinusJSON;

    public ReviewFullInfoVM(Review review) {
        super(review);
        this.plusMinusJSON = review.getPlusMinusJSON();
    }

    public static List<ReviewFullInfoVM> toReviewVMList(List<Review> reviews) {
        List<ReviewFullInfoVM> reviewVMs = new ArrayList<>();
        reviews.forEach(review -> reviewVMs.add(new ReviewFullInfoVM(review)));
        return reviewVMs;
    }
}
