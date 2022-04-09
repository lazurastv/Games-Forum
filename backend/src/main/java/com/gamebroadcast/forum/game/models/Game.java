package com.gamebroadcast.forum.game.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.gamebroadcast.forum.article.models.ArticleType;
import com.gamebroadcast.forum.exceptions.InvalidTagException;
import com.gamebroadcast.forum.interaction.rating.models.Rating;
import com.gamebroadcast.forum.tag.TagRepositories;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "game")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Game extends ArticleType {
    @Id
    @SequenceGenerator(name = "game_sequence", sequenceName = "game_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_sequence")
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    private Date gamePublishDate;

    @Column(nullable = false)
    private String developer;

    @Column
    private Double editorScore;

    @OneToMany
    private List<Rating> ratings;

    @ElementCollection
    private List<String> genres;

    @ElementCollection
    private List<String> platforms;

    @ElementCollection
    private List<String> distributions;

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
