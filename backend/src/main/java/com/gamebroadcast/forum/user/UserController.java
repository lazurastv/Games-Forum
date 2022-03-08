package com.gamebroadcast.forum.user;

import java.util.List;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.security.SessionUtils;
import com.gamebroadcast.forum.user.models.UserAdd;
import com.gamebroadcast.forum.user.models.UserVM;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserVM> getAll() {
        return userService.getAll();
    }

    @GetMapping(path = "/username/{username}")
    public UserVM getByUsername(@PathVariable("username") String username) {
        try {
            return userService.getByUsername(username);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/email/{email}")
    public UserVM getByEmail(@PathVariable("email") String email) {
        try {
            return userService.getByEmail(email);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/me")
    @PreAuthorize("hasRole('USER')") // Not sure what to use
    public UserVM getMe() {
        try {
            return userService.getMe();
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void add(@RequestBody UserAdd userAdd) {
        try {
            userService.add(userAdd);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        try {
            if (!sessionUserCanDeleteUser(id)) {
                throw new NoEditRightsException("User");
            }
            userService.delete(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanDeleteUser(Long id) {
        return userService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }

}
