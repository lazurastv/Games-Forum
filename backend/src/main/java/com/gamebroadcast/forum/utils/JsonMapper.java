package com.gamebroadcast.forum.utils;

import java.text.SimpleDateFormat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JsonMapper {

    public static ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(dateFormat);
        return mapper;
    }
}
