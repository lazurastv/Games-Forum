package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.AppUser;

import org.springframework.security.crypto.password.PasswordEncoder;

public class UserPersonalUpdate {
    private String shortDescription;
    private String password;
    private String repeatPassword;

    public void updatePersonal(AppUser user, PasswordEncoder passwordEncoder) { 
        if (shortDescription != null) {
            if (UserValidators.checkShortDescription(shortDescription)) {
                user.setShortDescription(shortDescription);
            }
        }
        if (password != null && password !="") {
            if (UserValidators.checkPassword(password) && UserValidators.checkPasswordMatch(password, repeatPassword)) {
                String passwordHash = passwordEncoder.encode(password);
                user.setPassword(passwordHash);
            }
        }   
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public String getPassword() {
        return password;
    }

    public String getRepeatPassword() {
        return repeatPassword;
    }
}
