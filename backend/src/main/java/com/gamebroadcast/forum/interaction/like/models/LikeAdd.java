package com.gamebroadcast.forum.interaction.like.models;

import com.gamebroadcast.forum.content.content.Content;

public class LikeAdd {
    public Long contentId;
    public boolean isLike;

    public Like toLike(Content content) {
        Like like = new Like();
        like.setContent(content);
        like.setLike(isLike);
        return like;
    }
}
