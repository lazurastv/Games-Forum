package com.gamebroadcast.forum.user;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.files.FileService;
import com.gamebroadcast.forum.user.models.UserAdd;
import com.gamebroadcast.forum.user.models.UserCredentialsUpdate;
import com.gamebroadcast.forum.user.models.UserRoleUpdate;
import com.gamebroadcast.forum.user.models.UserVM;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "api/user")
@CrossOrigin(origins = { "https://localhost", "http://localhost:3000" })
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final FileService fileService;

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

    @GetMapping(path = "/session")
    @PreAuthorize("hasRole('USER')")
    public UserVM getSessionUser() {
        return userService.getSessionUser();
    }

    @PostMapping(path = "/register")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void add(@RequestBody UserAdd userAdd) {
        try {
            String path = fileService.getUniqueName(SecurityContextHolder.getContext().getAuthentication().getName());
            userService.add(userAdd, path);
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
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void UpdateCredentials(@PathVariable("id") Long id, @RequestBody UserCredentialsUpdate userUpdate) {
        try {
            if (!sessionUserCanUpdateUserCredentials(id)) {
                throw new NoEditRightsException("User");
            }
            userService.updateCredentials(id, userUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}/editrole")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void UpdateRole(@PathVariable("id") Long id, @RequestBody UserRoleUpdate userUpdate) {
        try {
            userService.updateRole(id, userUpdate);
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

    @PostMapping(path = "/upload-profile-picture/{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('USER')")
    public void addUserImage(@PathVariable("userId") Long userId, @RequestParam(value = "image") MultipartFile profilePicture) {
        try {
            System.out.println(profilePicture);
            AppUser user =  userService.getUser(userId);
            String path = user.getProfilePicturePath();
            fileService.saveProfilePicture(path, profilePicture);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanDeleteUser(Long id) {
        return userService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }

    private boolean sessionUserCanUpdateUserCredentials(Long id) {
        return userService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}