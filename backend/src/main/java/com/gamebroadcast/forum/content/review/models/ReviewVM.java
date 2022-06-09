package com.gamebroadcast.forum.content.review.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.content.content.ContentVM;

public class ReviewVM extends ContentVM {
    public ReviewVM(Review review) {
        super(review);
    }

    public static List<ReviewVM> toReviewVMList(List<Review> reviews) {
        List<ReviewVM> reviewVMs = new ArrayList<>();
        reviews.forEach(review -> reviewVMs.add(new ReviewVM(review)));
        return reviewVMs;
    }
}
