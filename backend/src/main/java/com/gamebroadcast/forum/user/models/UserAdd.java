package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.exceptions.InvalidInputException;
import com.gamebroadcast.forum.user.AppUser;
import com.gamebroadcast.forum.user.UserService;

public class UserAdd {
    public String username;
    public String email;
    public String password;

    public AppUser toAppUser(UserService userService) {
        String message = null;

        if ((message = AppUser.checkUsername(this.username)) != null) {
            throw new InvalidInputException(message);
        } else if ((message = AppUser.checkEmail(this.username)) != null) {
            throw new InvalidInputException(message);
        } else if ((message = AppUser.checkPassword(this.password)) != null) {
            throw new InvalidInputException(message);
        } else {
            password = AppUser.hashPassword(password);
            return new AppUser(username, email, password);
        }
    }
}
