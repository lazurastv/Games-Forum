package com.gamebroadcast.forum.user.models;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.gamebroadcast.forum.exceptions.InvalidInputException;

import org.springframework.context.support.BeanDefinitionDsl.Role;

public class UserValidators {
    public static boolean checkUsername(String username) {
        if (username == null) {
            throw new InvalidInputException("Username is required.");
        } else if (username.length() < 1) {
            throw new InvalidInputException("Username is too short.");
        } else if (username.length() > 64) {
            throw new InvalidInputException("Username is too long.");
        }
        return true;
    }

    public static boolean checkEmail(String email) {
        final String EMAIL_PATTERN = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(email);
        if (email == null) {
            throw new InvalidInputException("Email is required.");
        } else if (!matcher.matches()) {
            throw new InvalidInputException("Invalid email.");
        }
        return true;
    }

    public static boolean checkPassword(String password) {
        if (password == null) {
            throw new InvalidInputException("Password is required.");
        } else if (password.length() < 1) {
            throw new InvalidInputException("Password is too short.");
        }
        return true;
    }

    public static boolean checkPasswordMatch(String password, String repeatPassword) {
        if(!password.equals(repeatPassword)) {
            throw new InvalidInputException("Passwords don't match.");
        }
        return true;
    }

    public static boolean checkShortDescription(String shortDescription) {
        return true;
    }

    public static boolean checkRole(String role) {
        for (Role e : Role.values()) {
            if (role.equals(e.name())) {
                return true;
            }
        }
        throw new InvalidInputException("Such role doesn't exist.");
    }
}
