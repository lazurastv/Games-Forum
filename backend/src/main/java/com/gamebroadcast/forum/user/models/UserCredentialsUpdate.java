package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

public class UserCredentialsUpdate {
    public String username;
    public String email;
    public String password;
    public String shortDescription;
    public String currentPassword;

    public void updateCredentials(AppUser user) {
        if (username != null) {
            user.setUsername(username);
        }
        if (email != null) {
            user.setEmail(email);
        }
        if (password != null) {
            user.setPassword(password);
        }
        user.setShortDescription(shortDescription);
    }
}