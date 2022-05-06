package com.gamebroadcast.forum.exceptions;

public class RequiredValueException extends RuntimeException {
    public RequiredValueException(String fieldName) {
        super(fieldName + " is required.");
    }
}
