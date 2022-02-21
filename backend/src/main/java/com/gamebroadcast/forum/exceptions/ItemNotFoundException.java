package com.gamebroadcast.forum.exceptions;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(String itemName, Long id) {
        super(itemName + " with id " + id + " has not been found");
    }
}
