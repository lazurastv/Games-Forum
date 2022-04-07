package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

import org.springframework.security.crypto.password.PasswordEncoder;

public class UserRoleUpdate {
    private String role;

    public void updatePersonal(AppUser user, PasswordEncoder passwordEncoder) { 
        if (role != null && role != "") {
            if (UserValidators.checkRole(role)) {
                user.setRole(role);
            }
        }
    }

    public String getRole() {
        return role;
    }
}
