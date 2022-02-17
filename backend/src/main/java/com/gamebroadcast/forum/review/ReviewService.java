package com.gamebroadcast.forum.review;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;

    public void addReview(Review review) throws IllegalStateException {
        Long reviewId = review.getId();
        if (reviewId != null && reviewRepository.existsById(reviewId)) {
            throw new IllegalStateException("Review with id " + reviewId + " already exists");
        }
        Optional<Review> reviewByTitle = reviewRepository.findByTitle(review.getTitle());
        if (reviewByTitle.isPresent()) {
            throw new IllegalStateException("Review with this title already exists");
        }
        reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReview(Long reviewId) throws IllegalStateException {
        Optional<Review> review = reviewRepository.findById(reviewId);
        if (review.isEmpty()) {
            throw new IllegalStateException("Review with id " + reviewId + " does not exist");
        }
        return review.get();
    }

    @Transactional
    public void updateReview(Review newReview) throws IllegalStateException {
        Long reviewId = newReview.getId();
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()-> new IllegalStateException("Review with id " + reviewId + " does not exist"));

        Optional<Review> optionalReview = reviewRepository.findByTitle(newReview.getTitle());
        if (optionalReview.isPresent() && optionalReview.get().getId() != reviewId) {
            throw new IllegalStateException("Review with the same title already exists");
        }

        String title = newReview.getTitle();
        if (title != null && title.length() > 0 && !Objects.equals(review.getTitle(), title)) {
            review.setTitle(title);
        }

        String contentPath = newReview.getContentPath();
        if (contentPath != null && contentPath.length() > 0 && !Objects.equals(review.getContentPath(), contentPath)) {
            review.setContentPath(contentPath);
        }

//        String imagePath = newReview.getContentPath();
//        if (imagePath != null && imagePath.length() > 0 && !Objects.equals(review.getImagePath(), imagePath)) {
//            review.setImagePath(imagePath);
//        }

        Double score = newReview.getScore();
        if (score != null && !Objects.equals(review.getScore(), score)) {
            review.setScore(score);
        }

        String prosConsPath = newReview.getProsConsPath();
        if (prosConsPath != null && prosConsPath.length() > 0 && !Objects.equals(review.getProsConsPath(), prosConsPath)) {
            review.setProsConsPath(prosConsPath);
        }
    }

    public void deleteReview(Long reviewId) throws IllegalStateException {
        if (!reviewRepository.existsById(reviewId)) {
            throw new IllegalStateException("Review with id " + reviewId + " does not exist");
        }
        reviewRepository.deleteById(reviewId);
    }
}
