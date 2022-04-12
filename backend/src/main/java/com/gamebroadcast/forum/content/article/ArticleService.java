package com.gamebroadcast.forum.content.article;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;

import com.gamebroadcast.forum.content.article.models.Article;
import com.gamebroadcast.forum.content.article.models.ArticleAddUpdate;
import com.gamebroadcast.forum.content.article.models.ArticleFullInfoVM;
import com.gamebroadcast.forum.content.article.models.ArticleVM;
import com.gamebroadcast.forum.exceptions.ItemAlreadyExistsException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.utils.SessionUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<ArticleVM> getAllArticles() {
        List<Article> articles = articleRepository.findAll();
        return ArticleVM.toArticleVMList(articles);
    }

    public List<ArticleVM> getSimilarArticles(Long articleId) {
        Article article = getArticle(articleId);
        List<Article> articles = articleRepository.findByAuthorId(article.getAuthor().getId());
        articles.remove(article);
        return ArticleVM.toArticleVMList(articles);
    }

    public ArticleVM getArticleById(Long articleId) {
        Article article = getArticle(articleId);
        return new ArticleVM(article);
    }

    public ArticleFullInfoVM getArticleFullInfoById(Long articleId) {
        Article article = getArticle(articleId);
        return new ArticleFullInfoVM(article);
    }

    public void addArticle(ArticleAddUpdate articleAdd, String path) {
        checkIfTitleIsUnique(articleAdd.title);
        Article article = articleAdd.toArticle(path);
        article.publish();
        articleRepository.save(article);
    }

    @Transactional
    public void updateArticle(Long id, ArticleAddUpdate articleUpdate) {
        Article article = getArticle(id);
        if (!article.getTitle().equals(articleUpdate.title)) {
            checkIfTitleIsUnique(articleUpdate.title);
        }
        articleUpdate.update(article);
    }

    public void deleteArticle(Long id) {
        Article article = getArticle(id);
        articleRepository.delete(article);
    }

    public Article getArticle(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("article", id));
    }

    private void checkIfTitleIsUnique(String title) {
        Optional<Article> article = articleRepository.findByTitle(title);
        if (article.isPresent()) {
            throw new ItemAlreadyExistsException("article");
        }
    }

    public boolean sessionUserIsOwner(Long id) {
        return getArticle(id).ownedBy(SessionUtils.getUserFromSession());
    }
}
