package com.gamebroadcast.forum.exceptions;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(String itemName, Long id) {
        super(itemName + " with id " + id + " has not been found");
    }
    
    public ItemNotFoundException(String itemName, String variableType, String value) {
        super(itemName + " with " + variableType + " " + value + " has not been found");
    }
}
