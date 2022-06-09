package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

public class UserAdd {
    public String username;
    public String email;
    public String password;

    public AppUser toAppUser() {
        AppUser user = new AppUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setShortDescription("");
        user.setProfilePicturePath("");
        return user;
    }
}
