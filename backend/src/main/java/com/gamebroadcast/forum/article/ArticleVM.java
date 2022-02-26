package com.gamebroadcast.forum.article;

import lombok.Data;

@Data
public class ArticleVM {
    private Long id;
    private String title;
    private String introduction;
    private String content;

    public ArticleVM() {
    }

    public ArticleVM(String title, String introduction, String content) {
        this.title = title;
        this.introduction = introduction;
        this.content= content;
    }

    public ArticleVM(Long id, String title, String introduction, String content) {
        this.id = id;
        this.title = title;
        this.introduction = introduction;
        this.content = content;
    }
}
