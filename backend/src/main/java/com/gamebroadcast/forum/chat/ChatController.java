package com.gamebroadcast.forum.chat;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.server.PathParam;

import com.gamebroadcast.forum.chat.models.ChatMessageVM;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.RandomGenerator;
import com.gamebroadcast.forum.utils.SessionUtils;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/chat")
@RequiredArgsConstructor
public class ChatController {
    private Map<String, AppUser> users = new HashMap<>();
    private Map<String, String> knownKeys = new HashMap<>();

    private final ChatService chatService;

    public AppUser pop(String key) {
        AppUser user = users.get(key);
        users.remove(key);
        knownKeys.remove(user.getUsername());
        return user;
    }

    /**
     * Removes session token if it already exists.
     * Keep in mind the session token is only used on connection,
     * so deleting it will not log out any other users who already
     * logged in using this token.
     */
    private void removeToken() {
        try {
            AppUser user = SessionUtils.getUserFromSession();
            users.remove(knownKeys.remove(user.getUsername()));
        } catch (NullPointerException e) {
        }
    }

    /**
     * Creates a new chat session token for the session user.
     * It is used to establish a web socket connection with a session,
     * and is immediately removed upon successful connection.
     * 
     * @return The token associated with the session.
     * @throws NullPointerException When no session user has been found.
     */
    private String addToken() throws NullPointerException {
        AppUser user = SessionUtils.getUserFromSession();
        String token = generateToken();
        users.put(token, user);
        knownKeys.put(user.getUsername(), token);
        return token;
    }

    private String generateToken() {
        String token = RandomGenerator.getRandomToken();
        while (users.containsKey(token)) {
            token = RandomGenerator.getRandomToken();
        }
        return token;
    }

    /**
     * Creates session token and returns it.
     * Note there is no timeout on it, so a security vulnerability
     * is that you can generate one, and if you don't use it, after 5 years
     * it will still be in program memory.
     * 
     * @return The generated one time use token.
     */
    @GetMapping(path = "/token")
    @PreAuthorize("hasRole('USER')")
    public String getToken() {
        removeToken();
        return addToken();
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<ChatMessageVM> getAll() {
        return chatService.getAll();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathParam("id") Long id) {
        chatService.delete(id);
    }
}
