package com.gamebroadcast.forum.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    public List<AppUser> findByEmail(String email);

    public List<AppUser> findByUsername(String username);
}
