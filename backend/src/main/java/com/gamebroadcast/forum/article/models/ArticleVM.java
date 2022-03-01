package com.gamebroadcast.forum.article.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ArticleVM {
    public Long id;
    public String title;
    public String path;
    public Date publishDate;
    public String authorName;

    public ArticleVM(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.path = article.getPath();
        this.publishDate = article.getPublishDate();
        this.authorName = article.getAuthor().getUsername();
    }

    public static List<ArticleVM> toArticleVMList(List<Article> articles) {
        List<ArticleVM> articleVMs = new ArrayList<>();
        articles.forEach(article -> articleVMs.add(new ArticleVM(article)));
        return articleVMs;
    }
}
