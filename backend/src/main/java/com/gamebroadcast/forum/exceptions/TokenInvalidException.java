package com.gamebroadcast.forum.exceptions;

public class TokenInvalidException extends RuntimeException {
    public TokenInvalidException() {
        super("Token is invalid.");
    }
    
}
