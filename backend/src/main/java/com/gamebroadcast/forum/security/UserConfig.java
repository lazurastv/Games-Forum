package com.gamebroadcast.forum.security;

import java.util.Optional;

import com.gamebroadcast.forum.user.UserRepository;
import com.gamebroadcast.forum.user.schemas.AppUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserConfig implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User does not exist");
        }

        return user.get();
    }

}
