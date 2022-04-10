package com.gamebroadcast.forum.interaction.comment.models;

public class CommentUpdate {
    public String comment;

    public void update(Comment comment) {
        comment.setComment(this.comment);
    }
}
