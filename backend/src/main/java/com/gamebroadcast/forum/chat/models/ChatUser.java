package com.gamebroadcast.forum.chat.models;

import java.security.Principal;

import com.gamebroadcast.forum.user.schemas.AppUser;

import lombok.Getter;

@Getter
public class ChatUser implements Principal {
    private Long id;
    private String name;
    private String profilePicturePath;

    public ChatUser(AppUser user) {
        id = user.getId();
        name = user.getUsername();
        profilePicturePath = user.getProfilePicturePath();
    }
}
