package com.gamebroadcast.forum.user.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.user.AppUser;

public class UserVM {
    public String username;
    public String email;
    public String shortDescription;
    public String profilePicturePath;
    public String role;

    public UserVM(AppUser user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.shortDescription = user.getShortDescription();
        this.profilePicturePath = user.getProfilePicturePath();
        this.role = user.getRole();
    }

    public static List<UserVM> toUserVMList(List<AppUser> users) {
        List<UserVM> userVMs = new ArrayList<>();
        users.forEach(user -> userVMs.add(new UserVM(user)));
        return userVMs;
    }
}