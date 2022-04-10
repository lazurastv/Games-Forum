package com.gamebroadcast.forum.interaction.like;

import java.util.List;

import com.gamebroadcast.forum.interaction.like.models.Like;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

    public List<Like> findByContentId(Long id);

    public List<Like> findByAuthorId(Long id);
}
