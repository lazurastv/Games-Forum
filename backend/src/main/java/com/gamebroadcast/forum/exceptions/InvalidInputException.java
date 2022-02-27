package com.gamebroadcast.forum.exceptions;

public class InvalidInputException extends RuntimeException{
    public InvalidInputException(String message) {
        super("Invalid value: " + message);
    }
}
