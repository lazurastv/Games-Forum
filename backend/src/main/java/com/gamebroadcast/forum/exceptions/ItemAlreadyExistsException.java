package com.gamebroadcast.forum.exceptions;

public class ItemAlreadyExistsException extends RuntimeException {
    public ItemAlreadyExistsException(String itemName) {
        super("Cannot add item of type " + itemName +". Item already exsists.");
    }
}
