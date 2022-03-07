package com.gamebroadcast.forum.interaction.like.models;

import com.gamebroadcast.forum.article.ArticleService;
import com.gamebroadcast.forum.article.models.Article;
import com.gamebroadcast.forum.utils.SessionUtils;
import com.gamebroadcast.forum.user.schemas.AppUser;

public class LikeAdd {
    public Long articleId;
    public boolean isLike;

    public Like toLike(ArticleService articleService) {
        Article article = articleService.getArticle(articleId);
        AppUser user = SessionUtils.getUserFromSession();
        return new Like(article, user, isLike);
    }
}
