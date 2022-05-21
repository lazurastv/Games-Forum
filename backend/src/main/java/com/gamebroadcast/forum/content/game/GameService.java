package com.gamebroadcast.forum.content.game;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;

import com.gamebroadcast.forum.content.game.models.Game;
import com.gamebroadcast.forum.content.game.models.GameAddUpdate;
import com.gamebroadcast.forum.content.game.models.GameFullInfoVM;
import com.gamebroadcast.forum.content.game.models.GameSearchInfoVM;
import com.gamebroadcast.forum.content.game.models.GameVM;
import com.gamebroadcast.forum.exceptions.ItemAlreadyExistsException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.utils.SessionUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    public List<GameVM> getAllGames() {
        List<Game> games = gameRepository.findAll();
        return GameVM.toGameVMList(games);
    }

    public List<GameSearchInfoVM> getAllGameSearchInfos() {
        List<Game> games = gameRepository.findAll();
        return GameSearchInfoVM.toGameSearchInfoVMList(games);
    }

    public List<GameSearchInfoVM> getSimilarGames(Long gameId) {
        List<GameSearchInfoVM> games = getAllGameSearchInfos();
        games.removeIf(x -> x.id == gameId);
        return games;
    }

    public GameVM getGameById(Long id) {
        Game game = getGame(id);
        return new GameVM(game);
    }

    public GameFullInfoVM getGameFullInfoById(Long id) {
        Game game = getGame(id);
        return new GameFullInfoVM(game);
    }

    public void addGame(GameAddUpdate gameAdd) {
        checkIfTitleIsUnique(gameAdd.title);
        Game game = gameAdd.toGame();
        game.publish();
        gameRepository.save(game);
    }

    @Transactional
    public void updateGame(Long id, GameAddUpdate gameUpdate) {
        Game game = getGame(id);
        if (!game.getTitle().equals(gameUpdate.title)) {
            checkIfTitleIsUnique(gameUpdate.title);
        }
        gameUpdate.update(game);
    }

    public void deleteGame(Long id) {
        Game game = getGame(id);
        gameRepository.delete(game);
    }

    public Game getGame(Long id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("game", id));
    }

    private void checkIfTitleIsUnique(String title) {
        Optional<Game> game = gameRepository.findByTitle(title);
        if (game.isPresent()) {
            throw new ItemAlreadyExistsException("game");
        }
    }

    public boolean sessionUserIsOwner(Long id) {
        return getGame(id).ownedBy(SessionUtils.getUserFromSession());
    }
}
