package com.gamebroadcast.forum.tag;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping(path = "/genres")
    public List<String> getAllGenres() {
        return tagService.getAllGenres();
    }

    @GetMapping(path = "/platforms")
    public List<String> getAllPlatforms() {
        return tagService.getAllPlatforms();
    }

    @GetMapping(path = "/distributions")
    public List<String> getAllDistributions() {
        return tagService.getAllDistributions();
    }
}
