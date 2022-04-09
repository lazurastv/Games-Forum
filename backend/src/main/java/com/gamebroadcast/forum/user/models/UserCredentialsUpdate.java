package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

import org.springframework.security.crypto.password.PasswordEncoder;

public class UserCredentialsUpdate {
    public String username;
    public String email;
    public String password;
    public String shortDescription;

    public void updateCredentials(AppUser user, PasswordEncoder passwordEncoder) {
        if (username != null && username != "") {
            if (UserValidators.checkUsername(username)) {
                user.setUsername(this.username);
            }
        }
        if (email != null && email != "") {
            if (UserValidators.checkEmail(email)) {
                user.setEmail(this.email);
            }
        }
        if (password != null && password != "") {
            if (UserValidators.checkPassword(password)) {
                String passwordHash = passwordEncoder.encode(password);
                user.setPassword(passwordHash);
            }
        }
        if (shortDescription != null) {
            if (UserValidators.checkShortDescription(shortDescription)) {
                user.setShortDescription(shortDescription);
            }
        }

    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }
}