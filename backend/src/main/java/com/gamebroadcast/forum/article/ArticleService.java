package com.gamebroadcast.forum.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public void addArticle(Article article) throws IllegalStateException {
        Long articleId = article.getId();
        if (articleId != null && articleRepository.existsById(articleId)) {
            throw new IllegalStateException("Article with id " + articleId + " already exists");
        }
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
            throw new IllegalStateException("Article with id " + articleId + " does not exist");
        }
        return article.get();
    }

    @Transactional
    public void updateArticle(Article newArticle) throws IllegalStateException {
        Long articleId = newArticle.getId();
        Article article = articleRepository.findById(articleId)
                .orElseThrow(()-> new IllegalStateException("Article with id " + articleId + " does not exist"));

        Optional<Article> optionalArticle = articleRepository.findArticleByTitle(newArticle.getTitle());
        if (optionalArticle.isPresent() && optionalArticle.get().getId() != articleId) {
            throw new IllegalStateException("Article with the same title already exists");
        }

        String title = newArticle.getTitle();
        if (title != null && title.length() > 0 && !Objects.equals(article.getTitle(), title)) {
            article.setTitle(title);
        }

        String contentPath = newArticle.getContentPath();
        if (contentPath != null && contentPath.length() > 0 && !Objects.equals(article.getContentPath(), contentPath)) {
            article.setContentPath(contentPath);
        }

        String imagePath = newArticle.getContentPath();
        if (contentPath != null && contentPath.length() > 0 && !Objects.equals(article.getImagePath(), imagePath)) {
            article.setImagePath(imagePath);
        }
    }

    public void deleteArticle(Long articleId) throws IllegalStateException {
        if (!articleRepository.existsById(articleId)) {
            throw new IllegalStateException("Article with id " + articleId + " does not exist");
        }
        articleRepository.deleteById(articleId);
    }
}
