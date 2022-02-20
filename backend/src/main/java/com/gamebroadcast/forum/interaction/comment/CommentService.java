package com.gamebroadcast.forum.interaction.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.transaction.Transactional;

import com.gamebroadcast.forum.article.ArticleService;
import com.gamebroadcast.forum.interaction.comment.models.Comment;
import com.gamebroadcast.forum.interaction.comment.models.CommentAdd;
import com.gamebroadcast.forum.interaction.comment.models.CommentUpdate;
import com.gamebroadcast.forum.interaction.comment.models.CommentVM;
import com.gamebroadcast.forum.security.SessionUtils;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleService articleService;

    public List<CommentVM> getAll() {
        List<Comment> comments = commentRepository.findAll();
        return CommentVM.toCommentVMList(comments);
    }

    public List<CommentVM> getByArticleId(Long id) {
        List<Comment> comments = commentRepository.findByArticleId(id);
        return CommentVM.toCommentVMList(comments);
    }

    public List<CommentVM> getByUserId(Long id) {
        List<Comment> comments = commentRepository.findByUserId(id);
        return CommentVM.toCommentVMList(comments);
    }

    public CommentVM get(Long id) throws IllegalStateException {
        Comment comment = getComment(id);
        return new CommentVM(comment);
    }

    public void add(CommentAdd commentAdd) throws IllegalStateException {
        Comment comment = commentAdd.toComment(articleService);
        commentRepository.save(comment);
    }

    @Transactional
    public void update(Long id, CommentUpdate commentUpdate) throws IllegalStateException {
        Comment comment = getComment(id);
        commentUpdate.update(comment);
    }

    public void delete(Long id) throws IllegalStateException {
        Comment comment = getComment(id);
        commentRepository.delete(comment);
    }

    public boolean sessionUserIsOwner(Long id) {
        return getComment(id).ownedBy(SessionUtils.getUserFromSession());
    }

    public Comment getComment(Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Item with id " + id + " does not exist"));
    }
}
