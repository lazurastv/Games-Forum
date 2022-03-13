package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.AppUser;

public class UserCreditentialsUpdate {
    public String username;
    public String email;
    public String password;
    public String repeatPassword;
    public String role;

    public void updateCreditentials(AppUser user) {
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
        if (password != null && password !="") {
            if (UserValidators.checkPassword(password) && UserValidators.checkPasswordMatch(password, repeatPassword)) {
                
            }
        }
        if (role != null && role != "") {
            if (UserValidators.checkRole(role)) {
                user.setRole(this.role);
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