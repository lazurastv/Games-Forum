package com.gamebroadcast.forum.user.requestresponsemodels;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserLoginRequest {

    private String username;

    private String password;

    private String rememberMe;

}
