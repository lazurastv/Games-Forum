package com.gamebroadcast.forum.article;

import javax.persistence.*;

@Entity
@Table(name = "article", uniqueConstraints = {
        @UniqueConstraint(name = "article_unique_title", columnNames = "title") })
public class Article {

    @Id
    @SequenceGenerator(name = "article_sequence", sequenceName = "article_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "title", nullable = false, length = 512)
    private String title;

    // Some tags for filter

    // Author

    @Column(name = "introduction", nullable = false, length = 2048)
    private String introduction;

    @Column(name = "content", nullable = false, length = 2048)
    private String content;

    public Article() {
    }

    public Article(String title, String introduction, String content) {
        this.title = title;
        this.introduction = introduction;
        this.content = content;
    }

    public Article(Long id, String title, String introduction, String content) {
        this.id = id;
        this.title = title;
        this.introduction = introduction;
        this.content = content;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
