package com.gamebroadcast.forum.content.game.models;

import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.content.content.ContentFullInfoVM;
import com.gamebroadcast.forum.content.review.models.ReviewVM;

public class GameFullInfoVM extends ContentFullInfoVM {
    public Date gamePublishDate;
    public String developer;
    public Double editorScore;
    public Double userScore;
    public List<ReviewVM> reviews;
    public List<String> genres;
    public List<String> platforms;
    public List<String> distributions;

    public GameFullInfoVM(Game game) {
        super(game);
        gamePublishDate = game.getGamePublishDate();
        developer = game.getDeveloper();
        editorScore = game.getEditorScore();
        userScore = game.calculateUserScore();
        reviews = ReviewVM.toReviewVMList(game.getReviews());
        genres = game.getGenres();
        platforms = game.getPlatforms();
        distributions = game.getDistributions();
    }
}
