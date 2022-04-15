package com.gamebroadcast.forum.content.game;

import com.gamebroadcast.forum.content.game.models.GameAddUpdate;
import com.gamebroadcast.forum.content.game.models.GameFullInfoVM;
import com.gamebroadcast.forum.content.game.models.GameVM;
import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping
    public List<GameVM> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping(path = "/Similar/{gameId}")
    public List<GameVM> getSimilarGames(@PathVariable("gameId") Long gameId) {
        return gameService.getSimilarGames(gameId);
    }

    @GetMapping(path = "/{gameId}")
    public GameVM getGame(@PathVariable("gameId") Long gameId) {
        try {
            return gameService.getGameById(gameId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/FullInfo/{gameId}")
    public GameFullInfoVM getGameFullInfo(@PathVariable("gameId") Long gameId) {
        try {
            return gameService.getGameFullInfoById(gameId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('EDITOR')")
    public void addGame(@RequestBody GameAddUpdate newGame) {
        try {
            gameService.addGame(newGame, newGame.content);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{gameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void updateGame(@PathVariable("gameId") Long gameId, @RequestBody GameAddUpdate gameUpdate) {
        try {
            if (!sessionUserCanEditGame(gameId)) {
                throw new NoEditRightsException("game");
            }
            gameService.updateGame(gameId, gameUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{gameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void deleteGame(@PathVariable("gameId") Long gameId) {
        try {
            if (!sessionUserCanDeleteGame(gameId)) {
                throw new NoEditRightsException("game");
            }
            gameService.deleteGame(gameId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanEditGame(Long id) {
        return gameService.sessionUserIsOwner(id);
    }

    private boolean sessionUserCanDeleteGame(Long id) {
        return gameService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}
