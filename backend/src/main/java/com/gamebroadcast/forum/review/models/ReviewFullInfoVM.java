package com.gamebroadcast.forum.review.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.article.models.Article;
import com.gamebroadcast.forum.article.models.ArticleFullInfoVM;

public class ReviewFullInfoVM extends ArticleFullInfoVM {
    public int score;
    public List<String> pluses;
    public List<String> minuses;

    public ReviewFullInfoVM(Review review) {
        super(new Article());
        id = review.getId();
        title = review.getTitle();
        introduction = review.getIntroduction();
        score = review.getScore();
        pluses = review.getPluses();
        minuses = review.getMinuses();
    }

    public static List<ReviewFullInfoVM> toReviewVMList(List<Review> reviews) {
        List<ReviewFullInfoVM> reviewVMs = new ArrayList<>();
        reviews.forEach(review -> reviewVMs.add(new ReviewFullInfoVM(review)));
        return reviewVMs;
    }
}
