package com.gamebroadcast.forum.content.article;

import com.gamebroadcast.forum.content.article.models.ArticleAddUpdate;
import com.gamebroadcast.forum.content.article.models.ArticleFullInfoVM;
import com.gamebroadcast.forum.content.article.models.ArticleSearchInfoVM;
import com.gamebroadcast.forum.content.article.models.ArticleVM;
import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.NoEditRightsException;
import com.gamebroadcast.forum.files.FileService;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = "api/article")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final FileService fileService;

    @GetMapping
    public List<ArticleVM> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping(path = "/SearchInfos")
    public List<ArticleSearchInfoVM> getAllArticlesSearchInfos() {
        return articleService.getAllArticleSearchInfos();
    }

    @GetMapping(path = "/Similar/{articleId}")
    public List<ArticleSearchInfoVM> getSimilarArticles(@PathVariable("articleId") Long articleId) {
        return articleService.getSimilarArticles(articleId);
    }

    @GetMapping(path = "/{articleId}")
    public ArticleVM getArticle(@PathVariable("articleId") Long articleId) {
        try {
            return articleService.getArticleById(articleId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/FullInfo/{articleId}")
    public ArticleFullInfoVM getArticleFullInfo(@PathVariable("articleId") Long articleId) {
        try {
            return articleService.getArticleFullInfoById(articleId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<String> addArticle(@RequestBody ArticleAddUpdate newArticle) {
        try {
            String path = fileService.getUniqueName(SecurityContextHolder.getContext().getAuthentication().getName());
            Long id = articleService.addArticle(newArticle, path);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"id\": \"" + id + "\"}");
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping(path = "/upload-content-and-images/{articleId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('EDITOR')")
    public void addArticleWithImages(@PathVariable("articleId") Long articleId, @RequestParam("content") String content, @RequestParam(value = "files", required = false) MultipartFile[] files) {
        try {
            ArticleVM article =  articleService.getArticleById(articleId);
            String path = article.path;
            fileService.saveNewContentFiles(path, content, files);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{articleId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void updateArticle(@PathVariable("articleId") Long articleId, @RequestBody ArticleAddUpdate articleUpdate) {
        try {
            if (!sessionUserCanEditArticle(articleId)) {
                throw new NoEditRightsException("article");
            }
            articleService.updateArticle(articleId, articleUpdate);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{articleId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EDITOR')")
    public void deleteArticle(@PathVariable("articleId") Long articleId) {
        try {
            if (!sessionUserCanDeleteArticle(articleId)) {
                throw new NoEditRightsException("article");
            }
            articleService.deleteArticle(articleId);
        } catch (RuntimeException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    private boolean sessionUserCanEditArticle(Long id) {
        return articleService.sessionUserIsOwner(id);
    }

    private boolean sessionUserCanDeleteArticle(Long id) {
        return articleService.sessionUserIsOwner(id) || SessionUtils.getUserFromSession().getRole().equals("ADMIN");
    }
}
