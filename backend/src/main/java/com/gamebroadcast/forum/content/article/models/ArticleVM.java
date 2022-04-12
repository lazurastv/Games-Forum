package com.gamebroadcast.forum.content.article.models;

import java.util.ArrayList;
import java.util.List;

import com.gamebroadcast.forum.content.content.ContentVM;

public class ArticleVM extends ContentVM {
    public ArticleVM(Article article) {
        super(article);
    }

    public static List<ArticleVM> toArticleVMList(List<Article> articles) {
        List<ArticleVM> articleVMs = new ArrayList<>();
        articles.forEach(article -> articleVMs.add(new ArticleVM(article)));
        return articleVMs;
    }
}
