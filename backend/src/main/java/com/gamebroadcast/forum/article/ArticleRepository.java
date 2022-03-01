package com.gamebroadcast.forum.article;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import com.gamebroadcast.forum.article.models.Article;

public interface ArticleRepository<T extends Article> extends JpaRepository<T, Long> {

    Optional<T> findByTitle(String title);

    List<T> findByAuthorId(Long id);
}
