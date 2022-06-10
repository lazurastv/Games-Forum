package com.gamebroadcast.forum.exceptions;

public class TokenInvalidException extends RuntimeException {
    TokenInvalidException() {
        super("Token is invalid.");
    }
    
}
