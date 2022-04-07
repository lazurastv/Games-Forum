package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.UserService;
import com.gamebroadcast.forum.user.schemas.AppUser;

import org.springframework.security.crypto.password.PasswordEncoder;


public class UserAdd {
    public String username;
    public String email;
    public String password;
    
    public AppUser toAppUser(UserService userService, PasswordEncoder passwordEncoder) {
        UserValidators.checkUsername(username);
        UserValidators.checkEmail(email);
        UserValidators.checkPassword(password);
        
        String passwordHash = passwordEncoder.encode(password);

        AppUser user = new AppUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordHash);
        return user;
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
}
