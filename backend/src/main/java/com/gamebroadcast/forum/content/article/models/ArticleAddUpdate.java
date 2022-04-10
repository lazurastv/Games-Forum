package com.gamebroadcast.forum.content.article.models;

import com.gamebroadcast.forum.content.content.ContentAddUpdate;

public class ArticleAddUpdate extends ContentAddUpdate {
    public Article toArticle(String path) {
        Article article = new Article(path);
        update(article);
        return article;
    }
}
