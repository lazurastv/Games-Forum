package com.gamebroadcast.forum.article;

import javax.persistence.*;

@Entity
@Table(name = "article", uniqueConstraints = {
        @UniqueConstraint(name = "article_unique_title", columnNames = "title") })
@Inheritance(strategy =  InheritanceType.SINGLE_TABLE)
public class Article {

    @Id
    @SequenceGenerator(name = "article_sequence", sequenceName = "article_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "title", nullable = false, length = 512)
    private String title;

    @Column(name = "introduction", nullable = false, length = 2048)
    private String introduction;

    @Column(name = "content_path", nullable = false, length = 1024)
    private String contentPath;

    @Column(name = "image_path", nullable = true, length = 1024)
    private String imagePath;

    public Article() {
    }

    public Article(String title, String introduction, String contentPath, String imagePath) {
        this.title = title;
        this.introduction = introduction;
        this.contentPath = contentPath;
        this.imagePath = imagePath;
    }

    public Article(Long id, String title, String introduction, String contentPath, String imagePath) {
        this.id = id;
        this.title = title;
        this.introduction = introduction;
        this.contentPath = contentPath;
        this.imagePath = imagePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getContentPath() {
        return contentPath;
    }

    public void setContentPath(String contentPath) {
        this.contentPath = contentPath;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
