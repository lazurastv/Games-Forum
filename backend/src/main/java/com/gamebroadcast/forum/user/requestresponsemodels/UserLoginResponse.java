package com.gamebroadcast.forum.user.requestresponsemodels;

import com.gamebroadcast.forum.user.AppUser;

import lombok.Getter;

@Getter
public class UserLoginResponse {
    private Long id;

    private String username;

    private String email;

    private String shortDescription;

    private String profilePicturePath;

    private String role;

    public UserLoginResponse(AppUser appUser) {
        this.id = appUser.getId();
        this.username = appUser.getUsername();
        this.email = appUser.getEmail();
        this.shortDescription = appUser.getShortDescription();
        this.profilePicturePath = appUser.getProfilePicturePath();
        this.role = appUser.getRole();
    }

}
