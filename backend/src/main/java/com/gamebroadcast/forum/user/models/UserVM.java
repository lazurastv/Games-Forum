package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

import lombok.Getter;

@Getter
public class UserVM {
    private Long id;

    private String username;

    private String email;

    private String shortDescription;

    private String profilePicturePath;

    private String role;

    public int commentCount;

    public boolean banned;

    public UserVM(AppUser appUser) {
        this.id = appUser.getId();
        this.username = appUser.getUsername();
        this.email = appUser.getEmail();
        this.shortDescription = appUser.getShortDescription();
        this.profilePicturePath = appUser.getProfilePicturePath();
        this.role = appUser.getRole();
        this.commentCount = appUser.getComments().size();
        this.banned = !appUser.isAccountNonLocked();
    }
}
