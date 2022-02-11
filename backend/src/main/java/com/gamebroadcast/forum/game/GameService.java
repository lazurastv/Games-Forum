package com.gamebroadcast.forum.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public void addGame(Game game) throws IllegalStateException {
        Long gameId = game.getId();
        if (gameId != null && gameRepository.existsById(gameId)) {
            throw new IllegalStateException("game with id " + gameId + " already exists");
        }
        Optional<Game> gameByTitle = gameRepository.findByTitle(game.getTitle());
        if (gameByTitle.isPresent()) {
            throw new IllegalStateException("game with this title already exists");
        }
        gameRepository.save(game);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game getGame(Long gameId) throws IllegalStateException {
        Optional<Game> game = gameRepository.findById(gameId);
        if (game.isEmpty()) {
            throw new IllegalStateException("game with id " + gameId + " does not exist");
        }
        return game.get();
    }

    @Transactional
    public void updateGame(Game newGame) throws IllegalStateException {
        Long gameId = newGame.getId();
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new IllegalStateException("game with id " + gameId + " does not exist"));

        Optional<Game> optionalGame = gameRepository.findByTitle(newGame.getTitle());
        if (optionalGame.isPresent() && optionalGame.get().getId() != gameId) {
            throw new IllegalStateException("game with the same title already exists");
        }

        String title = newGame.getTitle();
        if (title != null && title.length() > 0 && !Objects.equals(game.getTitle(), title)) {
            game.setTitle(title);
        }

        String contentPath = newGame.getContentPath();
        if (contentPath != null && contentPath.length() > 0 && !Objects.equals(game.getContentPath(), contentPath)) {
            game.setContentPath(contentPath);
        }

        String imagePath = newGame.getContentPath();
        if (imagePath != null && imagePath.length() > 0 && !Objects.equals(game.getImagePath(), imagePath)) {
            game.setImagePath(imagePath);
        }

        Date publishDate = newGame.getPublishDate();
        if (publishDate != null && !Objects.equals(game.getPublishDate(), publishDate)) {
            game.setPublishDate(publishDate);
        }

        String developer = newGame.getDeveloper();
        if (developer != null && developer.length() > 0 && !Objects.equals(game.getDeveloper(), developer)) {
            game.setDeveloper(developer);
        }

        Double editorScore = newGame.getEditorScore();
        if (editorScore != null && !Objects.equals(game.getEditorScore(), editorScore)) {
            game.setEditorScore(editorScore);
        }

        Double userScore = newGame.getUserScore();
        if (userScore != null && !Objects.equals(game.getUserScore(), userScore)) {
            game.setUserScore(userScore);
        }
    }

    public void deleteGame(Long gameId) throws IllegalStateException {
        if (!gameRepository.existsById(gameId)) {
            throw new IllegalStateException("game with id " + gameId + " does not exist");
        }
        gameRepository.deleteById(gameId);
    }
}
