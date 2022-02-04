package com.gamebroadcast.forum.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public void addArticle(Article article) throws IllegalStateException {
        Optional<Article> articleByTitle = articleRepository.findArticleByTitle(article.getTitle());
        if (articleByTitle.isPresent()) {
            throw new IllegalStateException("Article with this title already exists");
        }
        articleRepository.save(article);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article getArticle(Long articleId) throws IllegalStateException {
        Optional<Article> article = articleRepository.findById(articleId);
        if (article.isEmpty()) {
            throw new IllegalStateException("Article with id " + article + " does not exist");
        }
        return article.get();
    }

    public void updateArticle(Article article) throws IllegalStateException {
        Long articleId = article.getId();
        Optional<Article> optionalArticle = articleRepository.findArticleByTitle(article.getTitle());
        if (optionalArticle.isPresent() && optionalArticle.get().getId() != articleId) {
            throw new IllegalStateException("Article with the same title already exists");
        }
        if (!articleRepository.existsById(articleId)) {
            throw new IllegalStateException("Article with id " + articleId + " does not exist");
        }
        articleRepository.save(article);
    }

    public void deleteArticle(Long articleId) throws IllegalStateException {
        if (!articleRepository.existsById(articleId)) {
            throw new IllegalStateException("Article with id " + articleId + " does not exist");
        }
        articleRepository.deleteById(articleId);
    }
}
