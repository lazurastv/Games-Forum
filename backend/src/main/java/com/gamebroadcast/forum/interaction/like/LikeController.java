package com.gamebroadcast.forum.interaction.like;

import java.util.List;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.interaction.like.models.LikeAdd;
import com.gamebroadcast.forum.interaction.like.models.LikeVM;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @GetMapping
    public List<LikeVM> getAllLikes() {
        return likeService.getAll();
    }

    @GetMapping(path = "/ArticleId/{id}")
    public List<LikeVM> getLikeByArticleId(@PathVariable("id") Long id) {
        return likeService.getByArticleId(id);
    }

    @GetMapping(path = "/UserId/{id}")
    public List<LikeVM> getLikeByUserId(@PathVariable("id") Long id) {
        return likeService.getByUserId(id);
    }

    @GetMapping(path = "/Id/{id}")
    public LikeVM getLikeById(@PathVariable("id") Long id) {
        try {
            return likeService.get(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addLike(@RequestBody LikeAdd likeAdd) {
        try {
            likeService.add(likeAdd);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void toggleLike(@PathVariable("id") Long id) {
        try {
            if (!sessionUserIsOwner(id)) {
                throw new NoEditRightsException("Like");
            }
            likeService.toggle(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteLike(@PathVariable("id") Long id) {
        try {
            if (!sessionUserIsOwner(id)) {
                throw new NoEditRightsException("Like");
            }
            likeService.delete(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserIsOwner(Long id) {
        return likeService.sessionUserIsOwner(id);
    }
}
