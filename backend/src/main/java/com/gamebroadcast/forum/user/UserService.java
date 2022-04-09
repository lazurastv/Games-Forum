package com.gamebroadcast.forum.user;

import com.gamebroadcast.forum.exceptions.ApiRequestException;
import com.gamebroadcast.forum.exceptions.ItemAlreadyExistsException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.user.models.UserAdd;
import com.gamebroadcast.forum.user.models.UserCredentialsUpdate;
import com.gamebroadcast.forum.user.models.UserRoleUpdate;
import com.gamebroadcast.forum.user.models.UserVM;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

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

    public void add(UserAdd userAdd) throws IllegalStateException {
        try {
            if (usernameExists(userAdd.getUsername()) || emailExists(userAdd.getEmail())) {
                throw new ItemAlreadyExistsException("user");
            }
            AppUser user = userAdd.toAppUser(userService, passwordEncoder);
            userRepository.save(user);
        } catch (Exception e) {
            throw new ApiRequestException(e.getMessage());
        }

    }

    public void delete(Long id) throws IllegalStateException {
        AppUser user = getUser(id);
        userRepository.delete(user);
    }

    public void updateCredentials(Long id, UserCredentialsUpdate userUpdate) throws IllegalStateException {
        try {
            if ((usernameExists(userUpdate.getUsername()) && !isCurrentUsername(userUpdate.getUsername(), id))
                    || (emailExists(userUpdate.getEmail()) && !isCurrentEmail(userUpdate.getEmail(), id))) {
                throw new ItemAlreadyExistsException("user");
            }
            AppUser user = getUser(id);
            userUpdate.updateCredentials(user, passwordEncoder);
            userRepository.save(user);
        } catch (Exception e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    public void updateRole(Long id, UserRoleUpdate userUpdate) throws IllegalStateException {
        try {
            AppUser user = getUser(id);
            userUpdate.updateRole(user);
            userRepository.save(user);
        } catch (Exception e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    public void banUser(Long id) throws IllegalStateException {
        AppUser user = getUser(id);
        user.setLocked(true);
        userRepository.save(user);
    }

    public void unbanUser(Long id) throws IllegalStateException {
        AppUser user = getUser(id);
        user.setLocked(false);
        userRepository.save(user);
    }

    public boolean sessionUserIsOwner(Long id) {
        return getUser(id).equals(SessionUtils.getUserFromSession());
    }

    public AppUser getUser(Long id) {
        return (userRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("User", "id", Long.toString(id))));
    }

    private boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    private boolean isCurrentUsername(String username, Long id) {
        return getUser(id).getUsername().equals(username);
    }

    private boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    private boolean isCurrentEmail(String email, Long id) {
        return getUser(id).getEmail().equals(email);
    }
}
