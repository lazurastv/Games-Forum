package com.gamebroadcast.forum.exceptions;

public class NoEditRightsException extends RuntimeException {
    public NoEditRightsException(String name) {
        super("You don't have the required rights to edit this " + name);
    }
}
