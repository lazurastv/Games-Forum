package com.gamebroadcast.forum.interaction.rating;

import java.util.List;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.interaction.rating.models.RatingAdd;
import com.gamebroadcast.forum.interaction.rating.models.RatingUpdate;
import com.gamebroadcast.forum.interaction.rating.models.RatingVM;
import com.gamebroadcast.forum.security.SessionUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping
    public List<RatingVM> getAll() {
        return ratingService.getAll();
    }

    @GetMapping(path = "/GameId/{id}")
    public List<RatingVM> getByGameId(@PathVariable("id") Long id) {
        return ratingService.getByGameId(id);
    }

    @GetMapping(path = "/UserId/{id}")
    public List<RatingVM> getByUserId(@PathVariable("id") Long id) {
        return ratingService.getByUserId(id);
    }

    @GetMapping(path = "/Id/{id}")
    public RatingVM getById(@PathVariable("id") Long id) {
        try {
            return ratingService.getById(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void add(@RequestBody RatingAdd ratingAdd) {
        try {
            ratingService.add(ratingAdd);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void update(@PathVariable("id") Long id, @RequestBody RatingUpdate ratingUpdate) {
        try {
            if (!sessionUserCanEditRating(id)) {
                throw new NoEditRightsException("Rating");
            }
            ratingService.update(id, ratingUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        try {
            if (!sessionUserCanDeleteRating(id)) {
                throw new NoEditRightsException("Rating");
            }
            ratingService.delete(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanEditRating(Long id) {
        return ratingService.sessionUserIsOwner(id);
    }

    private boolean sessionUserCanDeleteRating(Long id) {
        return ratingService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}
