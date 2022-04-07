package com.gamebroadcast.forum.user;

import com.gamebroadcast.forum.user.models.UserVM;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(path = "/session")
    @PreAuthorize("hasRole('USER')")
    public UserVM getSessionUser() {
        return userService.getSessionUser();
    }
}
