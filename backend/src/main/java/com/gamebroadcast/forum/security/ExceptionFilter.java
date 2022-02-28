package com.gamebroadcast.forum.security;

import static com.gamebroadcast.forum.utils.ResponseUtils.UNPROCESSABLE_ENTITY;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.gamebroadcast.forum.utils.ResponseUtils;

import org.springframework.web.filter.OncePerRequestFilter;

public class ExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (RuntimeException e) {
            String message = e.getMessage();
            int statusCode = 401;

            if (message.equals(null)) {
                message = "Unexpected error has occurred";
                statusCode = 500;
            } else if (message.equals(UNPROCESSABLE_ENTITY)) {
                statusCode = 422;
            } else if (message.equals("User is disabled")) {
                message = "User has not verified";
            } else if (message.equals("User account is locked")) {
                message = "User is banned";
            } else if (message.equals("Bad credentials")) {
                message = "Wrong username or password";
            }

            ResponseUtils.setResponseFields(response, statusCode, message);
        }

    }

}
