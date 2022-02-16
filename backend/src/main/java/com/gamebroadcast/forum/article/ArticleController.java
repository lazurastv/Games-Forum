package com.gamebroadcast.forum.article;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.file.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "api/article")
public class ArticleController {

    private final ArticleService articleService;
    private final FileService fileService;

    @Autowired
    public ArticleController(ArticleService articleService, FileService fileService) {
        this.articleService = articleService;
        this.fileService = fileService;
    }

    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping(path = "/{articleId}")
    public Article getArticle(@PathVariable("articleId") Long articleId) {
        try {
            return articleService.getArticle(articleId);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addArticle(@RequestBody Article newArticle) {
        try {
            articleService.addArticle(newArticle);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{articleId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateArticle(@PathVariable("articleId") Long articleId, @RequestBody Article article) {
        try {
            article.setId(articleId);
            articleService.updateArticle(article);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{articleId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteArticle(@PathVariable("articleId") Long articleId) {
        try {
            articleService.deleteArticle(articleId);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    // TODO add to article create
    @GetMapping(value = "/image/{path}", produces = MediaType.IMAGE_PNG_VALUE)
    public @ResponseBody byte[] getImage(@PathVariable("path") String path) throws IOException {
        return fileService.readImage(true, path);
    }

    // TODO add to article create
    // TODO fix
    @PostMapping(value = "/image/{path}", produces = MediaType.IMAGE_PNG_VALUE)
    public void addImage(@PathVariable("path") String path, @RequestBody byte[] image) throws FileNotFoundException {
        fileService.writeImage(true, path, image);
    }

}
