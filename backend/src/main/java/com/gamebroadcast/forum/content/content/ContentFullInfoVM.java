package com.gamebroadcast.forum.content.content;

import java.util.Date;
import java.util.List;

import com.gamebroadcast.forum.interaction.comment.models.CommentVM;
import com.gamebroadcast.forum.user.models.AuthorVM;

public class ContentFullInfoVM {
    public Long id;
    public String title;
    public String introduction;
    public String path;
    public Date publishDate;
    public AuthorVM author;
    public int likes;
    public int dislikes;
    public List<CommentVM> comments;

    public ContentFullInfoVM(Content content) {
        this.id = content.getId();
        this.title = content.getTitle();
        this.introduction = content.getIntroduction();
        this.path = content.getPath();
        this.publishDate = content.getPublishDate();
        this.author = new AuthorVM(content.getAuthor());
        this.likes = content.getLikeCount();
        this.dislikes = content.getDislikeCount();
        this.comments = CommentVM.toCommentVMList(content.getComments());
    }
}
