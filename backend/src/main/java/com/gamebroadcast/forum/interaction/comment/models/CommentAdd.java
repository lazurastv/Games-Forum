package com.gamebroadcast.forum.interaction.comment.models;

import com.gamebroadcast.forum.article.ArticleService;
import com.gamebroadcast.forum.article.models.Article;
import com.gamebroadcast.forum.utils.SessionUtils;
import com.gamebroadcast.forum.user.schemas.AppUser;

public class CommentAdd {
    public Long articleId;
    public String content;

    public Comment toComment(ArticleService articleService) {
        Article article = articleService.getArticle(articleId);
        AppUser user = SessionUtils.getUserFromSession();
        return new Comment(article, user, content);
    }
}
