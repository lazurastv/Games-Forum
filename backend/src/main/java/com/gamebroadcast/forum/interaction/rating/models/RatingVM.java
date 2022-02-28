package com.gamebroadcast.forum.interaction.rating.models;

import java.util.ArrayList;
import java.util.List;

public class RatingVM {
	public Long id;
    public Long gameId;
    public Long userId;
    public int value;

    public RatingVM(Rating rating) {
        this.id = rating.getId();
        this.gameId = rating.getGame().getId();
        this.userId = rating.getUser().getId();
        this.value = rating.getValue();
    }

    public static List<RatingVM> toRatingVMList(List<Rating> ratings) {
        List<RatingVM> ratingVMs = new ArrayList<>();
        ratings.forEach(rating -> ratingVMs.add(new RatingVM(rating)));
        return ratingVMs;
    }
}