package com.gamebroadcast.forum.mail;

import org.springframework.context.ApplicationEvent;

import com.gamebroadcast.forum.user.schemas.AppUser;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private AppUser user;
    private String appUrl;
    
    public OnRegistrationCompleteEvent(AppUser user, String appUrl) {
        super(user);

        this.user = user;
        this.appUrl = appUrl;
    }

    public AppUser getUser() {
        return user;
    }

    public String getAppUrl() {
        return appUrl;
    }
}
