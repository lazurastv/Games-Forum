package com.gamebroadcast.forum.interaction.rating.models;

public class RatingUpdate {
    public int value;

    public void update(Rating rating) {
        rating.setValue(this.value);
    }
}
