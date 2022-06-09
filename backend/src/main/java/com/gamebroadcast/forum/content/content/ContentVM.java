package com.gamebroadcast.forum.content.content;

import java.util.Date;

public class ContentVM {
    public Long id;
    public String title;
    public String path;
    public Date publishDate;
    public String authorName;

    public ContentVM(Content content) {
        this.id = content.getId();
        this.title = content.getTitle();
        this.path = content.getPath();
        this.publishDate = content.getPublishDate();
        this.authorName = content.getAuthor().getUsername();
    }
}
