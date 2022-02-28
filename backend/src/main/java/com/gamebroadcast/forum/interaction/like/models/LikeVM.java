package com.gamebroadcast.forum.interaction.like.models;

import java.util.ArrayList;
import java.util.List;

public class LikeVM {
    public Long id;
    public Long articleId;
    public Long userId;
    public boolean isLike;

    public LikeVM(Like like) {
        this.id = like.getId();
        this.articleId = like.getArticle().getId();
        this.userId = like.getUser().getId();
        this.isLike = like.isLike();
    }

    public static List<LikeVM> toLikeVMList(List<Like> likes) {
        List<LikeVM> likeVMs = new ArrayList<>();
        likes.forEach(like -> likeVMs.add(new LikeVM(like)));
        return likeVMs;
    }
}
