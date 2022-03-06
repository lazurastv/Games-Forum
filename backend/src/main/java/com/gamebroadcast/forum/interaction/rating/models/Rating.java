package com.gamebroadcast.forum.interaction.rating.models;

import javax.persistence.*;

import com.gamebroadcast.forum.exceptions.InvalidInputException;
import com.gamebroadcast.forum.game.models.Game;
import com.gamebroadcast.forum.utils.SessionUtils;
import com.gamebroadcast.forum.user.schemas.AppUser;

import lombok.Data;

@Entity
@Data
@Table(name = "rating", uniqueConstraints = @UniqueConstraint(name = "rating_unique_game_and_user", columnNames = {
		"game_id", "user_id" }))
public class Rating {
	@Id
	@SequenceGenerator(name = "rating_sequence", sequenceName = "rating_sequence", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rating_sequence")
	@Column(name = "id", updatable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "game_id")
	private Game game;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private AppUser user;

	@Column
	private int value;

	public Rating() {
	}

	public Rating(Game game, int value) {
		this.game = game;
		this.user = SessionUtils.getUserFromSession();
		this.setValue(value);
	}

	public void setValue(int value) {
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

	public boolean checkValue(int value) {
		return (value >= 1 && value <= 10);
	}
}