package com.gamebroadcast.forum.interaction.like.models;

import java.util.ArrayList;
import java.util.List;

public class LikeVM {
    public Long id;
    public Long contentId;
    public String authorName;
    public boolean isLike;

    public LikeVM(Like like) {
        this.id = like.getId();
        this.contentId = like.getContent().getId();
        this.authorName = like.getAuthor().getUsername();
        this.isLike = like.isLike();
    }

    public static List<LikeVM> toLikeVMList(List<Like> likes) {
        List<LikeVM> likeVMs = new ArrayList<>();
        likes.forEach(like -> likeVMs.add(new LikeVM(like)));
        return likeVMs;
    }
}
