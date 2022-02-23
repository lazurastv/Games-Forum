package com.gamebroadcast.forum.tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping(path = "/genres")
    public List<String> getAllGenres() {
        return tagService.getAllGenres();
    }

    @GetMapping(path = "/platforms")
    public List<String> getAllPlatforms() {
        return tagService.getAllPlatforms();
    }

    @GetMapping(path = "/distributors")
    public List<String> getAllDistributors() {
        return tagService.getAllDistributors();
    }
}
