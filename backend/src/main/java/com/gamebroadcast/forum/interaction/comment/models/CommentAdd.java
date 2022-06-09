package com.gamebroadcast.forum.interaction.comment.models;

import com.gamebroadcast.forum.content.content.Content;

public class CommentAdd {
    public Long contentId;
    public String comment;

    public Comment toComment(Content content) {
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setComment(this.comment);
        return comment;
    }
}
