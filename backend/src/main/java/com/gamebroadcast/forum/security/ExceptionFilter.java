package com.gamebroadcast.forum.security;

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
            int statusCode = 401;

            if (e.getMessage() == ResponseUtils.UNPROCESSABLE_ENTITY_MESSAGE) {
                statusCode = 422;
            }

            ResponseUtils.setResponseFields(response, statusCode, e.getMessage());
        }

    }

}
