package com.gamebroadcast.forum.user;

import java.util.List;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.security.SessionUtils;
import com.gamebroadcast.forum.user.models.UserAdd;
import com.gamebroadcast.forum.user.models.UserVM;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public List<UserVM> getAll() {
        List<AppUser> users = userRepository.findAll();
        return UserVM.toUserVMList(users);
    }

    
    public UserVM getByUserId(Long id) throws IllegalStateException {
        UserVM userVM = new UserVM(userRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("User", "id", Long.toString(id))));
        return userVM;
    }
    

    public UserVM getByEmail(String email) throws IllegalStateException {
        UserVM userVM = new UserVM(userRepository.findByEmail(email)
                .orElseThrow(() -> new ItemNotFoundException("User", "email", email)));
        return userVM;
    }
 
    public UserVM getByUsername(String username) throws IllegalStateException {
        UserVM userVM = new UserVM(userRepository.findByUsername(username)
                .orElseThrow(() -> new ItemNotFoundException("User", "username", username)));
        return userVM;
    }



    // Use better method for getting myself instead of email
    public UserVM getMe() throws IllegalStateException {
        Long id = SessionUtils.getUserFromSession().getId();
        return getByUserId(id);
    }

    public void add(UserAdd userAdd) throws IllegalStateException { // Add checking for username / email before
        try {
            AppUser user = userAdd.toAppUser(userService);
            userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new ApiRequestException("Username or email already taken.");
        }
        
    }

    public void delete(Long id) throws IllegalStateException {
        AppUser user = getUser(id);
        userRepository.delete(user);
    }

    public boolean sessionUserIsOwner(Long id) {
        return getUser(id).equals(SessionUtils.getUserFromSession());
    }

    public AppUser getUser(Long id) {
        return (userRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("User", "id", Long.toString(id))));
    }

}
