package com.gamebroadcast.forum.exceptions;

public class InvalidTagException extends RuntimeException {
    public InvalidTagException(String type) {
        super("At least on of the given " + type + " is invalid!");
    }
}
