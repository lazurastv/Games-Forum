package com.gamebroadcast.forum.user.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserLogin {

    private String username;

    private String password;

    private boolean rememberMe;

}
