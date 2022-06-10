package com.gamebroadcast.forum.content.review;

import com.gamebroadcast.forum.content.article.models.ArticleVM;
import com.gamebroadcast.forum.content.review.models.ReviewUpdate;
import com.gamebroadcast.forum.content.review.models.ReviewAdd;
import com.gamebroadcast.forum.content.review.models.ReviewFullInfoVM;
import com.gamebroadcast.forum.content.review.models.ReviewSearchInfoVM;
import com.gamebroadcast.forum.content.review.models.ReviewVM;
import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.files.FileService;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = "api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final FileService fileService;

    @GetMapping
    public List<ReviewVM> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping(path = "/SearchInfos")
    public List<ReviewSearchInfoVM> getAllReviewSearchInfos() {
        return reviewService.getAllReviewSearchInfos();
    }

    @GetMapping(path = "/Similar/{reviewId}")
    public List<ReviewSearchInfoVM> getSimilarReviews(@PathVariable("reviewId") Long reviewId) {
        return reviewService.getSimilarReviews(reviewId);
    }

    @GetMapping(path = "/{reviewId}")
    public ReviewVM getReview(@PathVariable("reviewId") Long reviewId) {
        try {
            return reviewService.getReviewById(reviewId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/FullInfo/{reviewId}")
    public ReviewFullInfoVM getReviewFullInfo(@PathVariable("reviewId") Long reviewId) {
        try {
            return reviewService.getReviewFullInfoById(reviewId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('EDITOR')")
    public Long addReview(@RequestBody ReviewAdd newReview) {
        try {
            String path = fileService.getUniqueName(SecurityContextHolder.getContext().getAuthentication().getName());
            Long id = reviewService.addReview(newReview, path);
            return id;
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping(path = "/upload-content-and-images/{reviewId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('EDITOR')")
    public void addArticleWithImages(@PathVariable("reviewId") Long articleId, @RequestParam("content") String content, @RequestParam(value = "files", required = false) MultipartFile[] files) {
        try {
            System.out.println(content);
            ReviewVM review =  reviewService.getReviewById(articleId);
            String path = review.path;
            fileService.saveNewContentFiles(path, content, files);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{reviewId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void updateReview(@PathVariable("reviewId") Long reviewId, @RequestBody ReviewUpdate reviewUpdate) {
        try {
            if (!sessionUserCanEditReview(reviewId)) {
                throw new NoEditRightsException("review");
            }
            reviewService.updateReview(reviewId, reviewUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{reviewId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void deleteReview(@PathVariable("reviewId") Long reviewId) {
        try {
            if (!sessionUserCanDeleteReview(reviewId)) {
                throw new NoEditRightsException("review");
            }
            reviewService.deleteReview(reviewId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanEditReview(Long id) {
        return reviewService.sessionUserIsOwner(id);
    }

    private boolean sessionUserCanDeleteReview(Long id) {
        return reviewService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}
