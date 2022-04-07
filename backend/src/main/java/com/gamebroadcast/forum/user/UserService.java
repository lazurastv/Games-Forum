package com.gamebroadcast.forum.user;

import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.user.models.UserVM;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserVM getSessionUser() {
        Long id = SessionUtils.getUserFromSession().getId();
        AppUser user = getUser(id);
        return new UserVM(user);
    }

    private AppUser getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("User", id));
    }

}
