package com.gamebroadcast.forum.user.schemas;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.gamebroadcast.forum.content.article.models.Article;
import com.gamebroadcast.forum.interaction.comment.models.Comment;
import com.gamebroadcast.forum.interaction.like.models.Like;
import com.gamebroadcast.forum.interaction.rating.models.Rating;
import com.gamebroadcast.forum.security.Role;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@Entity
@Table(name = "app_user", uniqueConstraints = {
        @UniqueConstraint(name = "user_unique_username", columnNames = "username"),
        @UniqueConstraint(name = "user_unique_email", columnNames = "email") })
public class AppUser implements UserDetails {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @Column(name = "id", updatable = false)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "username", nullable = false, length = 60)
    private String username;

    @Column(name = "email", nullable = false, length = 254)
    private String email;

    @Column(name = "password", nullable = false, length = 60)
    private String password;

    @Column(name = "short_description", nullable = true, length = 300)
    private String shortDescription;

    @Column(name = "profile_picture_path", nullable = false, length = 100)
    private String profilePicturePath;

    @Column(name = "role", nullable = false, length = 6)
    private String role;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Article> articles;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Like> likes;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Rating> ratings;

    @Column(name = "enabled", nullable = false)
    private boolean enabled;

    @Column(name = "locked", nullable = false)
    private boolean locked;

    @Column(name = "last_used", nullable = false)
    private Timestamp lastUsed;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getAuthoritiesFromRole();
    }

    private Collection<? extends GrantedAuthority> getAuthoritiesFromRole() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role));

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public AppUser() {
        this.role = Role.USER.toString();
        this.enabled = true;
        this.locked = false;
        this.lastUsed = Timestamp.from(Instant.now());
    }
}
