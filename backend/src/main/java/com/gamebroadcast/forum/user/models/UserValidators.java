package com.gamebroadcast.forum.user.models;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.gamebroadcast.forum.exceptions.InvalidInputException;

import org.springframework.context.support.BeanDefinitionDsl.Role;

public class UserValidators {

    public static void checkUsername(String username) {
        final String USERNAME_PATTERN = "^[\\p{L}]+([\\p{L}0-9_-]+)$";
        Pattern pattern = Pattern.compile(USERNAME_PATTERN);
        Matcher matcher = pattern.matcher(username);
        if (username == null) {
            throw new InvalidInputException("Username is required.");
        } else if (username.length() > 60) {
            throw new InvalidInputException("Username is too long.");
        } else if (!matcher.matches()) {
            throw new InvalidInputException("Invalid username");
        }
    }

    public static void checkEmail(String email) {
        final String EMAIL_PATTERN = "^[a-zA-Z0-9_+-]+(\\.[a-zA-Z0-9_+-]+)*@"
                + "[a-zA-Z0-9][a-zA-Z0-9-]*(\\.[a-zA-Z0-9_+-]+)+$";
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(email);
        if (email == null) {
            throw new InvalidInputException("Email is required.");
        } else if (email.length() > 254) {
            throw new InvalidInputException("Email is too long.");
        } else if (!matcher.matches()) {
            throw new InvalidInputException("Invalid email.");
        }
    }

    public static void checkPassword(String password) {
        final String PASSWORD_PATTERN = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[@#$^&%+=\\-_?!*(){}<>,\\./\\\\\\[\\]])(?=\\S+$).{8,}$"; // /
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(password);
        if (password == null) {
            throw new InvalidInputException("Password is required.");
        } else if (!matcher.matches()) {
            throw new InvalidInputException("Invalid password.");
        }
    }

    public static void checkShortDescription(String shortDescription) {
        if (shortDescription.length() > 300) {
            throw new InvalidInputException("Short description is too long.");
        }
    }

    public static void checkRole(String role) {
        for (Role e : Role.values()) {
            if (role.equals(e.name())) {
                return;
            }
        }
        throw new InvalidInputException("Such role doesn't exist.");
    }
}
