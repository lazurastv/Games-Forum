package com.gamebroadcast.forum.content.content;

import com.gamebroadcast.forum.exceptions.ItemNotFoundException;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository<Content> contentRepository;

    public Content get(Long id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("content", id));
    }
}
