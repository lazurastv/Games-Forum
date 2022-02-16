package com.gamebroadcast.forum.interaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamebroadcast.forum.article.ArticleController;
import com.gamebroadcast.forum.base.BaseService;

@Service
public class CommentService extends BaseService<Comment, CommentDTO> {

    @Autowired
    private ArticleController articleController;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        super(commentRepository);
    }

    @Override
    public boolean isValid(CommentDTO item) {
        return item.content.length() > 3;
    }

    @Override
    public Comment createItem(CommentDTO itemDTO) {
        return new Comment(articleController.getArticle(itemDTO.articleId), itemDTO.content);
    }

    @Override
    public void updateItem(Comment item, CommentDTO itemDTO) {
        item.setContent(itemDTO.content);
    }
}
