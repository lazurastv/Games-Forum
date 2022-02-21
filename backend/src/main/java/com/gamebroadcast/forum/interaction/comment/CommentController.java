package com.gamebroadcast.forum.interaction.comment;

import java.util.List;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.interaction.comment.models.CommentAdd;
import com.gamebroadcast.forum.interaction.comment.models.CommentUpdate;
import com.gamebroadcast.forum.interaction.comment.models.CommentVM;
import com.gamebroadcast.forum.security.SessionUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public List<CommentVM> getAll() {
        return commentService.getAll();
    }

    @GetMapping(path = "/ArticleId/{id}")
    public List<CommentVM> getByArticleId(@PathVariable("id") Long id) {
        return commentService.getByArticleId(id);
    }

    @GetMapping(path = "/UserId/{id}")
    public List<CommentVM> getByUserId(@PathVariable("id") Long id) {
        return commentService.getByUserId(id);
    }

    @GetMapping(path = "/Id/{id}")
    public CommentVM getById(@PathVariable("id") Long id) {
        try {
            return commentService.get(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void add(@RequestBody CommentAdd commentAdd) {
        try {
            commentService.add(commentAdd);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void update(@PathVariable("id") Long id, @RequestBody CommentUpdate commentUpdate) {
        try {
            if (!sessionUserCanEditComment(id)) {
                throw new NoEditRightsException("Comment");
            }
            commentService.update(id, commentUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        try {
            if (!sessionUserCanEditComment(id)) {
                throw new NoEditRightsException("Comment");
            }
            commentService.delete(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanEditComment(Long id) {
        return commentService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}
