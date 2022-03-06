package com.gamebroadcast.forum.interaction.comment.models;

import java.util.ArrayList;
import java.util.List;

public class CommentVM {
    public Long id;
    public Long articleId;
    public Long userId;
    public String content;

    public CommentVM(Comment comment) {
        this.id = comment.getId();
        this.articleId = comment.getArticle().getId();
        this.userId = comment.getUser().getId();
        this.content = comment.getContent();
    }

    public static List<CommentVM> toCommentVMList(List<Comment> comments) {
        List<CommentVM> commentVMs = new ArrayList<>();
        comments.forEach(comment -> commentVMs.add(new CommentVM(comment)));
        return commentVMs;
    }
}
