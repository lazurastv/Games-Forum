package com.gamebroadcast.forum.review;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;

import com.gamebroadcast.forum.exceptions.ItemAlreadyExistsException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.review.models.Review;
import com.gamebroadcast.forum.review.models.ReviewAddUpdate;
import com.gamebroadcast.forum.review.models.ReviewFullInfoVM;
import com.gamebroadcast.forum.review.models.ReviewVM;
import com.gamebroadcast.forum.security.SessionUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<ReviewVM> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return ReviewVM.toReviewVMList(reviews);
    }

    public List<ReviewVM> getSimilarReviews(Long reviewId) {
        Review review = getReview(reviewId);
        List<Review> reviews = reviewRepository.findByAuthorId(review.getAuthor().getId());
        reviews.remove(review);
        return ReviewVM.toReviewVMList(reviews);
    }

    public ReviewVM getReviewById(Long reviewId) {
        Review review = getReview(reviewId);
        return new ReviewVM(review);
    }

    public ReviewFullInfoVM getReviewFullInfoById(Long reviewId) {
        Review review = getReview(reviewId);
        return new ReviewFullInfoVM(review);
    }

    public void addReview(ReviewAddUpdate reviewAdd, String path) {
        checkIfTitleIsUnique(reviewAdd.title);
        Review review = reviewAdd.toReview(path);
        reviewRepository.save(review);
    }

    @Transactional
    public void updateReview(Long id, ReviewAddUpdate reviewUpdate) {
        Review review = getReview(id);
        if (!review.getTitle().equals(reviewUpdate.title)) {
            checkIfTitleIsUnique(reviewUpdate.title);
        }
        reviewUpdate.update(review);
    }

    public void deleteReview(Long id) {
        Review review = getReview(id);
        reviewRepository.delete(review);
    }

    public Review getReview(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("review", id));
    }

    private void checkIfTitleIsUnique(String title) {
        Optional<Review> review = reviewRepository.findByTitle(title);
        if (review.isPresent()) {
            throw new ItemAlreadyExistsException("review");
        }
    }

    public boolean sessionUserIsOwner(Long id) {
        return getReview(id).ownedBy(SessionUtils.getUserFromSession());
    }
}
