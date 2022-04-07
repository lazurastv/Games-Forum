package com.gamebroadcast.forum.user;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.user.models.UserAdd;
import com.gamebroadcast.forum.user.models.UserCredentialsUpdate;
import com.gamebroadcast.forum.user.models.UserPersonalUpdate;
import com.gamebroadcast.forum.user.models.UserVM;
import com.gamebroadcast.forum.utils.SessionUtils;

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

    @GetMapping(path = "/{id}")
    public UserVM getById(@PathVariable("id") Long id) {
        try {
            return userService.getByUserId(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
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

    @PostMapping(path = "/register")
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

    @PutMapping(path = "/{id}/credentials")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void UpdateCredentials(@PathVariable("id") Long id, @RequestBody UserCredentialsUpdate userUpdate) {
        try {
            if (!sessionUserCanUpdateUser(id)) {
                throw new NoEditRightsException("User");
            }
            userService.updateCredentials(id, userUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}/editrole")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void UpdateRole(@PathVariable("id") Long id, @RequestBody UserPersonalUpdate userUpdate) {
        try {
            if (!SessionUtils.getUserFromSession().getRole().equals("ADMIN")) {
                throw new NoEditRightsException("User");
            }
            userService.updatePersonal(id, userUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}/ban")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void banUser(@PathVariable("id") Long id) {
        try {
            userService.banUser(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}/unban")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void unbanUser(@PathVariable("id") Long id) {
        try {
            userService.unbanUser(id);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanDeleteUser(Long id) {
        return userService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }

    private boolean sessionUserCanUpdateUser(Long id) {
        return userService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}