package com.gamebroadcast.forum.interaction.comment.models;

public class CommentUpdate {
    public String content;

    public void update(Comment comment) {
        comment.setContent(this.content);
    }
}
