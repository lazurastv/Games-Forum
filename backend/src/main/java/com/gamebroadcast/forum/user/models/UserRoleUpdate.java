package com.gamebroadcast.forum.user.models;

import com.gamebroadcast.forum.user.schemas.AppUser;

public class UserRoleUpdate {
    public String role;

    public void updateRole(AppUser user) {
        user.setRole(role);
    }
}
