package com.gamebroadcast.forum.review;

import com.gamebroadcast.forum.article.ArticleRepository;
import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.game.Game;
import com.gamebroadcast.forum.game.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping(path = "/{reviewId}")
    public Review getReview(@PathVariable("reviewId") Long reviewId) {
        try {
            return reviewService.getReview(reviewId);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addReview(@RequestBody Review newReview) {
        try {
            reviewService.addReview(newReview);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{reviewId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateReview(@PathVariable("reviewId") Long reviewId, @RequestBody Review review) {
        try {
            review.setId(reviewId);
            reviewService.updateReview(review);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{reviewId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteReview(@PathVariable("reviewId") Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }
}
