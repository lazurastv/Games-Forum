package com.gamebroadcast.forum.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.gamebroadcast.forum.article.models.Article;

public interface ReviewRepository<T extends Article> extends JpaRepository<T, Long> {

    Optional<T> findByTitle(String title);
}
