package com.gamebroadcast.forum.chat;

import java.util.HashMap;
import java.util.Map;

import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/chat")
public class ChatController {
    private static Map<String, AppUser> users = new HashMap<>();

    public AppUser get(String key) {
        return users.get(key);
    }

    @GetMapping(path = "/key")
    @PreAuthorize("hasRole('USER')")
    public String generateKey() {
        AppUser user = SessionUtils.getUserFromSession();
        users.put(user.getUsername(), user);
        return user.getUsername();
    }
}
