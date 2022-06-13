package com.gamebroadcast.forum.user.models;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.gamebroadcast.forum.exceptions.InvalidInputException;
import com.gamebroadcast.forum.security.Role;

public class UserValidators {

    public static void checkUsername(String username) {
        final String USERNAME_PATTERN = "^[\\p{L}]+([\\p{L}0-9_-]+)$";
        Pattern pattern = Pattern.compile(USERNAME_PATTERN);
        Matcher matcher = pattern.matcher(username);
        if (username == "") {
            throw new RuntimeException("Nazwa użytkownika jest wymagana");
        } else if (username.length() > 60) {
            throw new RuntimeException("Nazwa użytkownika jest za długa");
        } else if (!matcher.matches()) {
            throw new RuntimeException("Nazwa użytkownika może się składać tylko z cyfr, liczb i znaku _");
        }
    }

    public static void checkEmail(String email) {
        final String EMAIL_PATTERN = "^[a-zA-Z0-9_+-]+(\\.[a-zA-Z0-9_+-]+)*@"
                + "[a-zA-Z0-9][a-zA-Z0-9-]*(\\.[a-zA-Z0-9_+-]+)+$";
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(email);
        if (email == "") {
            throw new InvalidInputException("Adres email jest wymagany");
        } else if (email.length() > 254) {
            throw new InvalidInputException("Adres email jest za długi");
        } else if (!matcher.matches()) {
            throw new InvalidInputException("Niepoprawny adres email");
        }
    }

    public static void checkPassword(String password) {
        final String PASSWORD_PATTERN = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[@#$^&%+=\\-_?!*(){}<>,\\./\\\\\\[\\]])(?=\\S+$).{8,}$"; // /
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(password);
        if (password == "") {
            throw new InvalidInputException("Hasło jest wymagane");
        } else if (!matcher.matches()) {
            throw new InvalidInputException(
                    "Hasło musi mieć co najmniej 8 znaków i co najmniej 1 literę, cyfrę, dużą literę i znak specjalny");
        }
    }

    public static void checkShortDescription(String shortDescription) {
        if (shortDescription.length() > 300) {
            throw new InvalidInputException("Opis jest za długi");
        }
    }

    public static void checkRole(String role) {
        for (Role e : Role.values()) {
            if (role.equals(e.name())) {
                return;
            }
        }
        throw new InvalidInputException("Nie ma takiej roli");
    }
}
