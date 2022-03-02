package com.gamebroadcast.forum.review;

import java.util.List;
import java.util.Optional;

import com.gamebroadcast.forum.article.ArticleRepository;
import com.gamebroadcast.forum.review.models.Review;

public interface ReviewRepository extends ArticleRepository<Review> {

    Optional<Review> findByTitle(String title);

    List<Review> findByAuthorId(Long id);
}
