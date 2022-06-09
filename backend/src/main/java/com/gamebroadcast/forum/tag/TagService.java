package com.gamebroadcast.forum.tag;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    public List<String> getAllGenres() {
        return TagRepositories.genres;
    }

    public List<String> getAllPlatforms() {
        return TagRepositories.platforms;
    }

    public List<String> getAllDistributions() {
        return TagRepositories.distributions;
    }
}
