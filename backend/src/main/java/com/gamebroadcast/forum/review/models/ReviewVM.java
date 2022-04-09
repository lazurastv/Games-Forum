package com.gamebroadcast.forum.review.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.article.models.Article;
import com.gamebroadcast.forum.article.models.ArticleVM;

public class ReviewVM extends ArticleVM {
    public ReviewVM(Review review) {
        super(new Article());
        id = review.getId();
        title = review.getTitle();
        path = review.getPath();
        publishDate = review.getPublishDate();
        authorName = review.getAuthor().getUsername();
    }

    public static List<ReviewVM> toReviewVMList(List<Review> reviews) {
        List<ReviewVM> reviewVMs = new ArrayList<>();
        reviews.forEach(review -> reviewVMs.add(new ReviewVM(review)));
        return reviewVMs;
    }
}
