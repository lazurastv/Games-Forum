package com.gamebroadcast.forum.article;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.file.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<ArticleDTO> getAllArticles() {
        return articleService.getAllArticles().stream().map(a -> new ArticleDTO(
                a.getId(),
                a.getTitle(),
                a.getIntroduction(),
                fileService.readHtmlContent(a.getContentPath()))
        ).collect(Collectors.toList());
    }

    @GetMapping(path = "/{articleId}")
    public ArticleDTO getArticle(@PathVariable("articleId") Long articleId) {
        try {
            Article article = articleService.getArticle(articleId);
            return new ArticleDTO(
                    article.getId(),
                    article.getTitle(),
                    article.getIntroduction(),
                    fileService.readHtmlContent(article.getContentPath())
            );
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addArticle(@RequestBody ArticleDTO newArticle) {
        try {
            // TODO get username form auth
            String filePath = fileService.getUniqueName("username");
            System.out.println(filePath);
            articleService.addArticle(new Article(
                    newArticle.getTitle(),
                    newArticle.getIntroduction(),
                    filePath
            ));
            fileService.writeHtmlContent(filePath, newArticle.getContent());
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
        return fileService.readImage(false, path);
    }

    // TODO add to article create
    @PostMapping(path = "/image/{path}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void addImage(@PathVariable("path") String path, @RequestParam("file") MultipartFile file) throws FileNotFoundException {
        try {
            fileService.writeImage(false, path, file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
