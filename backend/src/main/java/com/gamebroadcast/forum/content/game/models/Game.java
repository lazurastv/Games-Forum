package com.gamebroadcast.forum.content.game.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.gamebroadcast.forum.content.content.Content;
import com.gamebroadcast.forum.content.review.models.Review;
import com.gamebroadcast.forum.exceptions.InvalidTagException;
import com.gamebroadcast.forum.interaction.rating.models.Rating;
import com.gamebroadcast.forum.tag.TagRepositories;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("G")
@NoArgsConstructor
public class Game extends Content {
    @Column
    private Date gamePublishDate;

    @Column
    private String developer;

    @Column
    private Double editorScore;

    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE)
    private List<Review> reviews;

    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE)
    private List<Rating> ratings;

    @ElementCollection
    private List<String> genres;

    @ElementCollection
    private List<String> platforms;

    @ElementCollection
    private List<String> distributions;

    public void setEditorScore(Double editorScore) {
        if (editorScore < 1.0 || editorScore > 10.0) {
            throw new RuntimeException("Ocena gry musi być w zakresie od 1 do 10");
        }
        this.editorScore = editorScore;
    }

    public void setGenres(List<String> genres) {
        if (!TagRepositories.genresExist(genres)) {
            throw new InvalidTagException("genres");
        }
        this.genres = genres;
    }

    public void setPlatforms(List<String> platforms) {
        if (!TagRepositories.platformsExist(platforms)) {
            throw new InvalidTagException("platforms");
        }
        this.platforms = platforms;
    }

    public void setDistributions(List<String> distributions) {
        if (!TagRepositories.distributionsExist(distributions)) {
            throw new InvalidTagException("distributions");
        }
        this.distributions = distributions;
    }

    public Double calculateUserScore() {
        Double score = 0.0;
        for (Rating rating : ratings) {
            score += rating.getValue();
        }
        score /= ratings.size();
        return score;
    }
}