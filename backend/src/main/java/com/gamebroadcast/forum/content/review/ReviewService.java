package com.gamebroadcast.forum.content.review;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;

import com.gamebroadcast.forum.content.game.GameService;
import com.gamebroadcast.forum.content.game.models.Game;
import com.gamebroadcast.forum.content.review.models.Review;
import com.gamebroadcast.forum.content.review.models.ReviewAdd;
import com.gamebroadcast.forum.content.review.models.ReviewUpdate;
import com.gamebroadcast.forum.content.review.models.ReviewFullInfoVM;
import com.gamebroadcast.forum.content.review.models.ReviewSearchInfoVM;
import com.gamebroadcast.forum.content.review.models.ReviewVM;
import com.gamebroadcast.forum.exceptions.ItemAlreadyExistsException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.utils.SessionUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final GameService gameService;
    private final ReviewRepository reviewRepository;

    public List<ReviewVM> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return ReviewVM.toReviewVMList(reviews);
    }

    public List<ReviewSearchInfoVM> getAllReviewSearchInfos() {
        List<Review> reviews = reviewRepository.findAll();
        return ReviewSearchInfoVM.toReviewSearchInfoVMList(reviews);
    }

    public List<ReviewSearchInfoVM> getSimilarReviews(Long reviewId) {
        List<ReviewSearchInfoVM> reviews = getAllReviewSearchInfos();
        reviews.removeIf(x -> x.id == reviewId);
        return reviews;
    }

    public ReviewVM getReviewById(Long reviewId) {
        Review review = getReview(reviewId);
        return new ReviewVM(review);
    }

    public ReviewFullInfoVM getReviewFullInfoById(Long reviewId) {
        Review review = getReview(reviewId);
        return new ReviewFullInfoVM(review);
    }

    public void addReview(ReviewAdd reviewAdd) {
        checkIfTitleIsUnique(reviewAdd.title);
        Game game = gameService.getGame(reviewAdd.gameId);
        Review review = reviewAdd.toReview(game);
        review.publish();
        reviewRepository.save(review);
    }

    @Transactional
    public void updateReview(Long id, ReviewUpdate reviewUpdate) {
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
