package com.gamebroadcast.forum.utils;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.gamebroadcast.forum.exceptions.RequestException;

public class ResponseUtils {
    public static final String UNPROCESSABLE_ENTITY_MESSAGE = "Invalid format for login credentails";

    public static void setResponseFields(HttpServletResponse response, int statusCode, String message)
            throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (statusCode >= 400) {
            response.getWriter().write(JsonMapper.objectMapper().writeValueAsString(new RequestException(message)));
        } else {
            response.getWriter().write(message);
        }
    }
}
