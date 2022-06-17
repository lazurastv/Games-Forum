package com.gamebroadcast.forum.content.game;

import com.gamebroadcast.forum.content.article.models.ArticleVM;
import com.gamebroadcast.forum.content.game.models.GameAddUpdate;
import com.gamebroadcast.forum.content.game.models.GameFullInfoVM;
import com.gamebroadcast.forum.content.game.models.GameSearchInfoVM;
import com.gamebroadcast.forum.content.game.models.GameVM;
import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.files.FileService;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final FileService fileService;

    @GetMapping
    public List<GameVM> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping(path = "/SearchInfos")
    public List<GameSearchInfoVM> getAllGameSearchInfos() {
        return gameService.getAllGameSearchInfos();
    }

    @GetMapping(path = "/Similar/{gameId}")
    public List<GameSearchInfoVM> getSimilarGames(@PathVariable("gameId") Long gameId) {
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
    public Long addGame(@RequestBody GameAddUpdate newGame) {
        try {
            String path = fileService.getUniqueName(SecurityContextHolder.getContext().getAuthentication().getName());
            Long id = gameService.addGame(newGame, path);
            return id;
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping(path = "/upload-content-and-images/{gameId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('EDITOR')")
    public void addGameContentWithImages(@PathVariable("gameId") Long gameId, @RequestParam("content") String content,
                                         @RequestParam(value = "mainPicture", required = false) MultipartFile mainPicture,
                                         @RequestParam(value = "files", required = false) MultipartFile[] files) {
        try {
            GameVM game =  gameService.getGameById(gameId);
            String path = game.path;
            fileService.saveNewContentFiles(path, content, mainPicture, files);
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
            GameVM article = gameService.getGameById(gameId);
            String path = article.path;
            fileService.deleteContent(path);
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
