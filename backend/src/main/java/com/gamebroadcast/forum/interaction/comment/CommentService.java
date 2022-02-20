package com.gamebroadcast.forum.interaction.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamebroadcast.forum.article.ArticleRepository;
import com.gamebroadcast.forum.user.UserRepository;
import com.gamebroadcast.forum.base.BaseService;

@Service
public class CommentService extends BaseService<Comment, CommentDTO> {

    @Autowired
    private ArticleRepository articles;

    @Autowired
    private UserRepository users;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        super(commentRepository);
    }

    @Override
    public boolean isValid(CommentDTO itemDTO) {
        return articles.existsById(itemDTO.articleId) && users.existsById(itemDTO.userId);
    }

    @Override
    public Comment createItem(CommentDTO itemDTO) {
        Comment comment = new Comment(itemDTO.content);
        articles.getById(itemDTO.articleId).getComments().add(comment);
        users.getById(itemDTO.userId).getComments().add(comment);
        return comment;
    }

    @Override
    public void updateItem(Comment item, CommentDTO itemDTO) {
        item.setContent(itemDTO.content);
    }

    @Override
    public boolean userOwns(Comment item) {
        return true;
    }
}
