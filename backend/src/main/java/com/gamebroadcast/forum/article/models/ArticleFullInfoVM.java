package com.gamebroadcast.forum.article.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.interaction.comment.models.CommentVM;
import com.gamebroadcast.forum.user.models.AuthorVM;

public class ArticleFullInfoVM {
    public Long id;
    public String title;
    public String introduction;
    public String path;
    public Date publishDate;
    public AuthorVM author;
    public int likes;
    public int dislikes;
    public List<CommentVM> comments;

    public ArticleFullInfoVM(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.introduction = article.getIntroduction();
        this.path = article.getPath();
        this.publishDate = article.getPublishDate();
        this.author = new AuthorVM(article.getAuthor());
        this.likes = article.getLikeCount();
        this.dislikes = article.getDislikeCount();
        this.comments = CommentVM.toCommentVMList(article.getComments());
    }

    public static List<ArticleFullInfoVM> toArticleVMList(List<Article> articles) {
        List<ArticleFullInfoVM> articleVMs = new ArrayList<>();
        articles.forEach(article -> articleVMs.add(new ArticleFullInfoVM(article)));
        return articleVMs;
    }
}
