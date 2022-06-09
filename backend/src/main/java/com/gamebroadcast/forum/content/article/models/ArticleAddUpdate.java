package com.gamebroadcast.forum.content.article.models;

import com.gamebroadcast.forum.content.content.ContentAddUpdate;

public class ArticleAddUpdate extends ContentAddUpdate {
    public Article toArticle() {
        Article article = new Article();
        update(article);
        return article;
    }
}
