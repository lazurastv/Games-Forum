package com.gamebroadcast.forum.interaction.rating.models;

import javax.persistence.*;

import com.gamebroadcast.forum.article.Article;
import com.gamebroadcast.forum.exceptions.InvalidInputException;
import com.gamebroadcast.forum.user.AppUser;

import lombok.Data;

@Entity
@Data
@Table(name = "rating")
public class Rating {
	@Id
    @SequenceGenerator(name = "rating_sequence", sequenceName = "rating_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rating_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

	@ManyToOne
    @JoinColumn(name = "game_id")
    private Article game;

	@ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

	@Column
    private int value;

	public Rating(){
	} 

	public Rating(AppUser user, Article game, int value)
	{
		this.game = game;
		this.user = user;

		if (!checkValue(value)) {
			throw new InvalidInputException("Rating value must be an integer between 1 and 10.");
		}

		this.value = value;
	}

	public boolean ownedBy(AppUser user) {
        return this.user.getId().equals(user.getId());
    }

	public boolean ownedBy(Long id) {
        return this.user.getId().equals(id);
    }

	// ----------------

	public boolean checkValue(int value) {
        return (value >= 1 && value <= 10);
    }
}