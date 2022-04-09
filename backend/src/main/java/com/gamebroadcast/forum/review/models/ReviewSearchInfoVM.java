package com.gamebroadcast.forum.review.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.article.models.ArticleSearchInfoVM;

public class ReviewSearchInfoVM extends ArticleSearchInfoVM {
    public ReviewSearchInfoVM(Review review) {
        super(review);
        id = review.getId();
    }

    public static List<ReviewSearchInfoVM> toReviewVMList(List<Review> reviews) {
        List<ReviewSearchInfoVM> reviewSearchInfoVM = new ArrayList<>();
        reviews.forEach(review -> reviewSearchInfoVM.add(new ReviewSearchInfoVM(review)));
        return reviewSearchInfoVM;
    }
}
