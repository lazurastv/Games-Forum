package com.gamebroadcast.forum.content.content;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentRepository<T extends Content> extends JpaRepository<T, Long> {

    Optional<T> findByTitle(String title);

    List<T> findByAuthorId(Long id);
}
