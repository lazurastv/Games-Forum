package com.gamebroadcast.forum.interaction.rating.models;

import com.gamebroadcast.forum.article.Article;
import com.gamebroadcast.forum.article.ArticleService;
import com.gamebroadcast.forum.exceptions.InvalidInputException;
import com.gamebroadcast.forum.security.SessionUtils;
import com.gamebroadcast.forum.user.AppUser;

public class RatingAdd {
    public Long gameId;
    public int value;

    public Rating toRating(ArticleService articleService) {
        Article game = articleService.getArticle(gameId);
        AppUser user = SessionUtils.getUserFromSession();

        if (!Rating.checkValue(this.value)) {
            throw new InvalidInputException("Rating value must be an integer between 1 and 10.");
        }
  
        return new Rating(user, game, value);
    }
}
