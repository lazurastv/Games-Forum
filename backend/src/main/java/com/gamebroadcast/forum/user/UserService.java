package com.gamebroadcast.forum.user;

import java.util.List;
import java.util.Optional;

import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.user.models.UserVM;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserVM> getAll() {
        List<AppUser> users = userRepository.findAll();
        return UserVM.toUserVMList(users);
    }

    /*
    public List<UserVM> getByUserId(Long id) {
        Optional<AppUser> users = userRepository.findById(id);
        return UserVM.toUserVMList(users);
    }
    */

    public UserVM getByEmail(String email) throws IllegalStateException {
        UserVM userVM = new UserVM(userRepository.findByEmail(email)
                .orElseThrow(() -> new ItemNotFoundException("User", "email", email)));
        return userVM;
    }
 
    public UserVM getByUsername(String username) {
        UserVM userVM = new UserVM(userRepository.findByUsername(username)
                .orElseThrow(() -> new ItemNotFoundException("User", "username", username)));
        return userVM;
    } 

}
