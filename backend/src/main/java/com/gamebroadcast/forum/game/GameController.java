package com.gamebroadcast.forum.game;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.game.models.GameAddUpdate;
import com.gamebroadcast.forum.game.models.GameFullInfoVM;
import com.gamebroadcast.forum.game.models.GameVM;
import com.gamebroadcast.forum.security.SessionUtils;

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

    @GetMapping(path = "/{gameId}")
    public GameVM getArticle(@PathVariable("gameId") Long gameId) {
        try {
            return gameService.getGameById(gameId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/FullInfo/{gameId}")
    public GameFullInfoVM getArticleFullInfo(@PathVariable("gameId") Long gameId) {
        try {
            return gameService.getGameFullInfoById(gameId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('EDITOR')")
    public void addArticle(@RequestBody GameAddUpdate newGame) {
        try {
            gameService.addGame(newGame, newGame.content);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{gameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void updateArticle(@PathVariable("gameId") Long gameId, @RequestBody GameAddUpdate gameUpdate) {
        try {
            if (!sessionUserCanEditArticle(gameId)) {
                throw new NoEditRightsException("article");
            }
            gameService.updateGame(gameId, gameUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{gameId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void deleteArticle(@PathVariable("gameId") Long gameId) {
        try {
            if (!sessionUserCanDeleteArticle(gameId)) {
                throw new NoEditRightsException("article");
            }
            gameService.deleteGame(gameId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanEditArticle(Long id) {
        return gameService.sessionUserIsOwner(id);
    }

    private boolean sessionUserCanDeleteArticle(Long id) {
        return gameService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}
