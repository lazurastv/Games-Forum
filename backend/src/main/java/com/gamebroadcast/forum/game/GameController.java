package com.gamebroadcast.forum.game;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping(path = "/{gameId}")
    public Game getGame(@PathVariable("gameId") Long gameId) {
        try {
            return gameService.getGame(gameId);
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

    @PutMapping(path = "/{gameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateGame(@PathVariable("gameId") Long gameId, @RequestBody Game game) {
        try {
            game.setId(gameId);
            gameService.updateGame(game);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{gameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteGame(@PathVariable("gameId") Long gameId) {
        try {
            gameService.deleteGame(gameId);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }
}
