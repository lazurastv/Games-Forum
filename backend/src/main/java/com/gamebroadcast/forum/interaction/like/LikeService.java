package com.gamebroadcast.forum.interaction.like;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.transaction.Transactional;

import com.gamebroadcast.forum.content.article.ArticleService;
import com.gamebroadcast.forum.content.content.Content;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.interaction.like.models.Like;
import com.gamebroadcast.forum.interaction.like.models.LikeAdd;
import com.gamebroadcast.forum.interaction.like.models.LikeVM;
import com.gamebroadcast.forum.utils.SessionUtils;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private ArticleService articleService;

    public List<LikeVM> getAll() {
        List<Like> likes = likeRepository.findAll();
        return LikeVM.toLikeVMList(likes);
    }

    public List<LikeVM> getByArticleId(Long id) {
        List<Like> likes = likeRepository.findByContentId(id);
        return LikeVM.toLikeVMList(likes);
    }

    public List<LikeVM> getByUserId(Long id) {
        List<Like> likes = likeRepository.findByAuthorId(id);
        return LikeVM.toLikeVMList(likes);
    }

    public LikeVM get(Long id) throws IllegalStateException {
        Like like = getLike(id);
        return new LikeVM(like);
    }

    public void add(LikeAdd likeAdd) throws IllegalStateException {
        Content content = articleService.getArticle(likeAdd.contentId);
        Like like = likeAdd.toLike(content);
        like.publish();
        likeRepository.save(like);
    }

    @Transactional
    public void toggle(Long id) throws IllegalStateException {
        Like like = getLike(id);
        like.toggleLike();
    }

    public void delete(Long id) throws IllegalStateException {
        Like like = getLike(id);
        likeRepository.delete(like);
    }

    public boolean sessionUserIsOwner(Long id) {
        return getLike(id).ownedBy(SessionUtils.getUserFromSession());
    }

    public Like getLike(Long id) {
        return likeRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Like", id));
    }
}
