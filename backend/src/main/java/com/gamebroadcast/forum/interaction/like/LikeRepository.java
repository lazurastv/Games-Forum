package com.gamebroadcast.forum.interaction.like;

import java.util.List;

import com.gamebroadcast.forum.interaction.like.models.Like;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

    public List<Like> findByArticleId(Long id);

    public List<Like> findByUserId(Long id);
}
