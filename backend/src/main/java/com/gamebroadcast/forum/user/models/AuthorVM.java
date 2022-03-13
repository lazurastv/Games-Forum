package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

public class AuthorVM {
    public Long id;
    public String name;
    public String shortDescription;
    public String profilePicturePath;

    public AuthorVM(AppUser user) {
        this.id = user.getId();
        this.name = user.getUsername();
        this.shortDescription = user.getShortDescription();
        this.profilePicturePath = user.getProfilePicturePath();
    }
}
