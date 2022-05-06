package com.gamebroadcast.forum.content.article.models;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.gamebroadcast.forum.content.content.Content;

import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue(value = "A")
@NoArgsConstructor
public class Article extends Content {
}
