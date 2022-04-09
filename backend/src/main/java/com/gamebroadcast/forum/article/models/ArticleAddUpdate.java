package com.gamebroadcast.forum.article.models;

public class ArticleAddUpdate {
    public String title;
    public String introduction;
    public String content;

    public Article toArticle(String path) {
        Article article = new Article();
        update(article);
        article.setPath(path);
        return article;
    }

    public void update(Article article) {
        article.setTitle(title);
        article.setIntroduction(introduction);
    }
}
