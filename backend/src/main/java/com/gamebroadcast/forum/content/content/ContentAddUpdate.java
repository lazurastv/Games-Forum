package com.gamebroadcast.forum.content.content;

public class ContentAddUpdate {
    public String title;
    public String introduction;
    public String content;

    public void update(Content content) {
        content.setTitle(title);
        content.setIntroduction(introduction);
    }
}
