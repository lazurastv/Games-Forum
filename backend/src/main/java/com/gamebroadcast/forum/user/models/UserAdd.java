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

        if ((message = checkUsername(this.username)) != null) {
            throw new InvalidInputException(message);
        } else if ((message = checkEmail(this.username)) != null) {
            throw new InvalidInputException(message);
        } else if ((message = checkPassword(this.password)) != null) {
            throw new InvalidInputException(message);
        } else {
            password = hashPassword(password); // hash
            return new AppUser(username, email, password);
        }
        
    }

    public String checkUsername(String username) {
        if (username.length() > 60) {
            return "Username is too long.";
        }
        return null;
    }

    public String checkEmail(String email) {
        if (email.length() > 254) {
            return "Email is too long.";
        }
        return null;
    }

    public String checkPassword(String password) {
        if (password.length() > 60) {
            return "Password is too long.";
        }
        return null;
    }

    public String hashPassword(String password) {
        return password;
    }
}
