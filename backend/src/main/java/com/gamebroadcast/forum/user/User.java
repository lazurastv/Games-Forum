package com.gamebroadcast.forum.user;

import java.util.List;

import javax.persistence.*;

import com.gamebroadcast.forum.interaction.Comment;

//Mock User, to be implemented later

@Entity
@Table(name = "users")
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    // @OneToMany(mappedBy = "user")
    // private List<Comment> comments;
}
