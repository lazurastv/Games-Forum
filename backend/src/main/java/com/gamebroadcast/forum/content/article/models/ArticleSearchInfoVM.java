package com.gamebroadcast.forum.content.article.models;

import java.util.ArrayList;
import java.util.List;

public class ArticleSearchInfoVM extends ArticleVM {

    public int popularity;

    public ArticleSearchInfoVM(Article article) {
        super(article);
        this.popularity = article.getLikeCount() + article.getDislikeCount();
    }

    public static List<ArticleSearchInfoVM> toArticleSearchInfoVMList(List<Article> articles) {
        List<ArticleSearchInfoVM> articleSearchInfoVM = new ArrayList<>();
        articles.forEach(article -> articleSearchInfoVM.add(new ArticleSearchInfoVM(article)));
        return articleSearchInfoVM;
    }
}