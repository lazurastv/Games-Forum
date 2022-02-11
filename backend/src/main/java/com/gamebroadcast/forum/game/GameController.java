package com.gamebroadcast.forum.game;

import com.gamebroadcast.forum.article.ArticleService;
import com.gamebroadcast.forum.exceptions.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
//@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping(path = "/{GameId}")
    public Game getGame(@PathVariable("GameId") Long GameId) {
        try {
            return gameService.getGame(GameId);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addGame(@RequestBody Game newGame) {
        try {
            gameService.addGame(newGame);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{GameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateGame(@PathVariable("GameId") Long GameId, @RequestBody Game Game) {
        try {
            Game.setId(GameId);
            gameService.updateGame(Game);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{GameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteGame(@PathVariable("GameId") Long GameId) {
        try {
            gameService.deleteGame(GameId);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }
}
