package com.gamebroadcast.forum.interaction.rating;

import java.util.List;

import com.gamebroadcast.forum.interaction.rating.models.Rating;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {

	public List<Rating> findByGameId(Long id);

	public List<Rating> findByAuthorId(Long id);

	public List<Rating> findByAuthorIdAndGameId(Long userId, Long gameId);
}