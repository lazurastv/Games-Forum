package com.gamebroadcast.forum.user;

import com.gamebroadcast.forum.exceptions.ItemAlreadyExistsException;
import com.gamebroadcast.forum.exceptions.ItemNotFoundException;
import com.gamebroadcast.forum.user.models.UserAdd;
import com.gamebroadcast.forum.user.models.UserCredentialsUpdate;
import com.gamebroadcast.forum.user.models.UserRoleUpdate;
import com.gamebroadcast.forum.user.models.UserVM;
import com.gamebroadcast.forum.user.models.UserValidators;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserVM getByUserId(Long id) throws IllegalStateException {
        UserVM userVM = new UserVM(getUser(id));
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

    public UserVM getSessionUser() {
        Long id = SessionUtils.getUserFromSession().getId();
        AppUser user = getUser(id);
        return new UserVM(user);
    }

    public void add(UserAdd userAdd) {
        UserValidators.checkUsername(userAdd.username);
        UserValidators.checkEmail(userAdd.email);
        UserValidators.checkPassword(userAdd.password);

        if (usernameExists(userAdd.username) || emailExists(userAdd.email)) {
            throw new ItemAlreadyExistsException("user");
        }

        userAdd.password = passwordEncoder.encode(userAdd.password);
        AppUser user = userAdd.toAppUser();
        userRepository.save(user);
    }

    public void updateCredentials(Long id, UserCredentialsUpdate userUpdate) throws IllegalStateException {
        UserValidators.checkUsername(userUpdate.username);
        UserValidators.checkEmail(userUpdate.email);
        UserValidators.checkPassword(userUpdate.password);
        UserValidators.checkShortDescription(userUpdate.shortDescription);

        if ((usernameExists(userUpdate.username) && !isCurrentUsername(userUpdate.email, id))
                || (emailExists(userUpdate.email) && !isCurrentEmail(userUpdate.email, id))) {
            throw new ItemAlreadyExistsException("user");
        }

        AppUser user = getUser(id);
        userUpdate.updateCredentials(user);
        userRepository.save(user);
    }

    public void updateRole(Long id, UserRoleUpdate userUpdate) throws IllegalStateException {
        UserValidators.checkRole(userUpdate.role);

        AppUser user = getUser(id);
        userUpdate.updateRole(user);
        userRepository.save(user);
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
