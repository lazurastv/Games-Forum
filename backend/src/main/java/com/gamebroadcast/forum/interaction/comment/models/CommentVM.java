package com.gamebroadcast.forum.interaction.comment.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CommentVM {
    public Long id;
    public Long contentId;
    public String authorName;
    public Date publishDate;
    public String comment;

    public CommentVM(Comment comment) {
        this.id = comment.getId();
        this.contentId = comment.getContent().getId();
        this.authorName = comment.getAuthor().getUsername();
        this.publishDate = comment.getPublishDate();
        this.comment = comment.getComment();
    }

    public static List<CommentVM> toCommentVMList(List<Comment> comments) {
        List<CommentVM> commentVMs = new ArrayList<>();
        comments.forEach(comment -> commentVMs.add(new CommentVM(comment)));
        return commentVMs;
    }
}
