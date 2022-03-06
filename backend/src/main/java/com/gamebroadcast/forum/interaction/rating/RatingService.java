package com.gamebroadcast.forum.interaction.rating;

import java.util.List;

import javax.transaction.Transactional;

import com.gamebroadcast.forum.exceptions.ItemAlreadyExistsException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.game.GameService;
import com.gamebroadcast.forum.game.models.Game;
import com.gamebroadcast.forum.interaction.rating.models.Rating;
import com.gamebroadcast.forum.interaction.rating.models.RatingAdd;
import com.gamebroadcast.forum.interaction.rating.models.RatingUpdate;
import com.gamebroadcast.forum.interaction.rating.models.RatingVM;
import com.gamebroadcast.forum.security.SessionUtils;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RatingService {
    private RatingRepository ratingRepository;

    private GameService gameService;

    public List<RatingVM> getAll() {
        List<Rating> ratings = ratingRepository.findAll();
        return RatingVM.toRatingVMList(ratings);
    }

    public RatingVM getById(Long id) {
        Rating rating = getRating(id);
        return new RatingVM(rating);
    }

    public List<RatingVM> getByGameId(Long id) {
        List<Rating> ratings = ratingRepository.findByGameId(id);
        return RatingVM.toRatingVMList(ratings);
    }

    public List<RatingVM> getByUserId(Long id) {
        List<Rating> ratings = ratingRepository.findByUserId(id);
        return RatingVM.toRatingVMList(ratings);
    }

    public void add(RatingAdd ratingAdd) {
        Game game = gameService.getGame(ratingAdd.gameId);
        Rating rating = ratingAdd.toRating(game);

        if (!ratingDoesNotExsist(rating)) {
            throw new ItemAlreadyExistsException("rating");
        }

        ratingRepository.save(rating);
    }

    @Transactional
    public void update(Long id, RatingUpdate ratingUpdate) {
        Rating rating = getRating(id);
        ratingUpdate.update(rating);
    }

    public void delete(Long id) {
        Rating rating = getRating(id);
        ratingRepository.delete(rating);
    }

    public boolean sessionUserIsOwner(Long id) {
        return getRating(id).ownedBy(SessionUtils.getUserFromSession());
    }

    public Rating getRating(Long id) {
        return ratingRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Rating", id));
    }

    public boolean ratingDoesNotExsist(Rating rating) {
        List<Rating> v = ratingRepository.findByUserIdAndGameId(rating.getUser().getId(), rating.getGame().getId());
        return (v == null || v.isEmpty());
    }
}
