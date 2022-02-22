package com.gamebroadcast.forum.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.gamebroadcast.forum.user.schemas.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    Optional<AppUser> findByUsername(String username);
}
