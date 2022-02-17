package com.gamebroadcast.forum.article;

import lombok.Data;

@Data
public class ArticleDTO {
    private Long id;
    private String title;
    private String introduction;
    private String content;

    public ArticleDTO() {
    }

    public ArticleDTO(String title, String introduction, String content/*, String imagePath*/) {
        this.title = title;
        this.introduction = introduction;
        this.content= content;
    }

    public ArticleDTO(Long id, String title, String introduction, String content/*, String image*/) {
        this.id = id;
        this.title = title;
        this.introduction = introduction;
        this.content = content;
    }
}
