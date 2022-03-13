package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.AppUser;
import com.gamebroadcast.forum.user.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;


public class UserAdd {
    public String username;
    public String email;
    public String password;
    public String repeatPassword;
    
    public AppUser toAppUser(UserService userService, PasswordEncoder passwordEncoder) {
        UserValidators.checkUsername(username);
        UserValidators.checkEmail(email);
        UserValidators.checkPassword(password);
        UserValidators.checkPasswordMatch(password, repeatPassword);
        
        String passwordHash = passwordEncoder.encode(password);

        return new AppUser(username, email, passwordHash);
    }

    public String getUsername(){
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRepeatPassword() {
        return repeatPassword;
    }
}
