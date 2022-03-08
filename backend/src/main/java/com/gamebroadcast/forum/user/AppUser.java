package com.gamebroadcast.forum.user;

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

import com.gamebroadcast.forum.interaction.comment.models.Comment;
import com.gamebroadcast.forum.interaction.like.models.Like;
import com.gamebroadcast.forum.interaction.rating.models.Rating;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Entity
@Data
@Table(name = "app_user", uniqueConstraints = {
        @UniqueConstraint(name = "user_unique_username", columnNames = "username"),
        @UniqueConstraint(name = "user_unique_email", columnNames = "email") })
public class AppUser implements UserDetails {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @Column(name = "id", updatable = false)
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Like> likes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Rating> ratings;

    @Column(name = "enabled", nullable = false)
    private boolean enabled;

    @Column(name = "locked", nullable = false)
    private boolean locked;

    @Column(name = "last_used", nullable = false)
    private Timestamp lastUsed;

    public AppUser(Long id, String username, String email, String password, String shortDescription,
            String profilePicturePath, String role, boolean enabled, boolean locked, Timestamp lastUsed) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.shortDescription = shortDescription;
        this.profilePicturePath = profilePicturePath;
        this.role = role;
        this.enabled = enabled;
        this.locked = locked;
        this.lastUsed = lastUsed;
    }

    public AppUser(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.shortDescription = "Hello there!";
        this.profilePicturePath = "none";
        this.role = "USER";
        this.enabled = true; // to be changed
        this.locked = false;
        this.lastUsed = Timestamp.from(Instant.now());
    }

    public AppUser() {
    }

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

    public void setAccountNonLocked(boolean nonLocked) {
        this.locked = !nonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    // ----------------

    public static String checkUsername(String username) {
        if (username.length() > 60) {
            return "Username is too long.";
        }
        return null;
    }

    public static String checkEmail(String email) {
        if (email.length() > 254) {
            return "Email is too long.";
        }
        return null;
    }

    public static String checkPassword(String password) {
        if (password.length() > 60) {
            return "Password is too long.";
        }
        return null;
    }

    public static String hashPassword(String password) {
        return password;
    }
}
