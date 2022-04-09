package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

public class UserCredentialsUpdate {
    public String username;
    public String email;
    public String password;
    public String shortDescription;

    public void updateCredentials(AppUser user) {
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setShortDescription(shortDescription);
    }
}