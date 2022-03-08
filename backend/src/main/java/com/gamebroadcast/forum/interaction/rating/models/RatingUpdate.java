package com.gamebroadcast.forum.interaction.rating.models;

import com.gamebroadcast.forum.exceptions.InvalidInputException;

public class RatingUpdate {
    public int value;

    public void update(Rating rating) {
        
        if (!Rating.checkValue(this.value)) {
            throw new InvalidInputException("Rating value must be an integer between 1 and 10.");
        }

        rating.setValue(this.value);
    }
}
