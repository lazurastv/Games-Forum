package com.gamebroadcast.forum.tag;

import java.util.Arrays;
import java.util.List;

public class TagRepositories {
    public static final List<String> genres = Arrays.asList(new String[] {
            "Action",
            "RPG",
            "Strategy",
            "Survival",
            "Sandbox",
            "FPS",
            "Adventure"
    });

    public static final List<String> platforms = Arrays.asList(new String[] {
            "PC",
            "Xbox 360",
            "PlayStation 4",
            "Xbox One",
            "PlayStation 3"
    });

    public static final List<String> distributions = Arrays.asList(new String[] {
            "Steam",
            "Epic Games",
            "Ubisoft"
    });

    private static boolean itemsExist(List<String> candidates, List<String> destination) {
        for (String item : candidates) {
            if (!destination.contains(item)) {
                return false;
            }
        }
        return true;
    }

    public static boolean genreExists(String genre) {
        return genres.contains(genre);
    }

    public static boolean genresExist(List<String> givenGenres) {
        return itemsExist(givenGenres, genres);
    }

    public static boolean platformExists(String platform) {
        return platforms.contains(platform);
    }

    public static boolean platformsExist(List<String> givenPlatforms) {
        return itemsExist(givenPlatforms, platforms);
    }

    public static boolean distributionExists(String distribution) {
        return distributions.contains(distribution);
    }

    public static boolean distributionsExist(List<String> givenDistributions) {
        return itemsExist(givenDistributions, distributions);
    }
}