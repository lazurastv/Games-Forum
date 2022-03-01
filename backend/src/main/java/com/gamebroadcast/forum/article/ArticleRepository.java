package com.gamebroadcast.forum.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

import com.gamebroadcast.forum.article.models.Article;

public interface ArticleRepository<T extends Article> extends JpaRepository<T, Long> {

    @Query("SELECT a FROM Article a WHERE a.title = ?1")
    Optional<T> findByTitle(String title);
}
