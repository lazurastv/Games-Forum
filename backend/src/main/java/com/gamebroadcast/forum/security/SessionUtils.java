package com.gamebroadcast.forum.security;

import com.gamebroadcast.forum.user.AppUser;

import org.springframework.security.core.context.SecurityContextHolder;

public class SessionUtils {

    public static AppUser getUserFromSession() {
        return (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
