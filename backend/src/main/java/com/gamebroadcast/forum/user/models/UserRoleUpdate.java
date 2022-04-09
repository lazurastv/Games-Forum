package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

public class UserRoleUpdate {
    private String role;

    public void updateRole(AppUser user) {
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
