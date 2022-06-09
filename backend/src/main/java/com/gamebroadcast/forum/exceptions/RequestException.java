package com.gamebroadcast.forum.exceptions;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import lombok.Getter;

@Getter
public class RequestException {
    private final String errorMessage;

    private final ZonedDateTime timestamp;

    public RequestException(String message) {
        this.errorMessage = message;
        this.timestamp = ZonedDateTime.now(ZoneId.of("UTC+01:00"));
    }
}