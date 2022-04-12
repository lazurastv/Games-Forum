package com.gamebroadcast.forum.article.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.content.article.models.Article;

public class ArticleSearchInfoVM {
    public Long id;
    public String title;
    public String path;
    public Date publishDate;
    public String authorName;
    public int popularity;

    public ArticleSearchInfoVM(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.path = article.getPath();
        this.publishDate = article.getPublishDate();
        this.authorName = article.getAuthor().getUsername();
        this.popularity = article.getLikeCount() + article.getDislikeCount();
    }

    public static List<ArticleSearchInfoVM> toArticleSearchInfoVMList(List<Article> articles) {
        List<ArticleSearchInfoVM> articleSearchInfoVM = new ArrayList<>();
        articles.forEach(article -> articleSearchInfoVM.add(new ArticleSearchInfoVM(article)));
        return articleSearchInfoVM;
    }
}
