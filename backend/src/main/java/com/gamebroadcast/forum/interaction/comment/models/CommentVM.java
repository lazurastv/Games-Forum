package com.gamebroadcast.forum.interaction.comment.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.user.models.AuthorVM;

public class CommentVM {
    public Long id;
    public Long contentId;
    public AuthorVM authorVM;
    public Date publishDate;
    public String comment;

    public CommentVM(Comment comment) {
        this.id = comment.getId();
        this.contentId = comment.getContent().getId();
        this.authorVM = new AuthorVM(comment.getAuthor());
        this.publishDate = comment.getPublishDate();
        this.comment = comment.getComment();
    }

    public static List<CommentVM> toCommentVMList(List<Comment> comments) {
        List<CommentVM> commentVMs = new ArrayList<>();
        comments.forEach(comment -> commentVMs.add(new CommentVM(comment)));
        return commentVMs;
    }
}
