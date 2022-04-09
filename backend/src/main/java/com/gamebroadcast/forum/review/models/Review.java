package com.gamebroadcast.forum.review.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.*;

import com.gamebroadcast.forum.article.models.ArticleType;

@Entity
@Table(name = "review")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Review extends ArticleType {
    @Id
    @SequenceGenerator(name = "review_sequence", sequenceName = "review_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_sequence")
    @Column(updatable = false)
    private Long id;

    @Column
    private int score;

    @ElementCollection
    private List<String> pluses;

    @ElementCollection
    private List<String> minuses;

    public void setScore(int score) {
        if (score < 1 || score > 10) {
            throw new IllegalArgumentException("Score must be between 1 and 10.");
        }
        this.score = score;
    }
}
