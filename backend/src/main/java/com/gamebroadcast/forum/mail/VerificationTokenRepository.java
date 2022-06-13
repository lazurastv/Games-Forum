package com.gamebroadcast.forum.mail;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamebroadcast.forum.user.schemas.AppUser;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    
    VerificationToken findByToken(String token);

    VerificationToken findByUser(AppUser user);
}
