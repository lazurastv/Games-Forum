package com.gamebroadcast.forum.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gamebroadcast.forum.user.models.UserLogin;
import com.gamebroadcast.forum.user.models.UserVM;
import com.gamebroadcast.forum.user.schemas.AppUser;
import com.gamebroadcast.forum.utils.ResponseUtils;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final PersistentTokenBasedRememberMeServices rememberMeServices;
    private UserLogin fromBody;

    public LoginFilter(
            AuthenticationManager authenticationManager,
            PersistentTokenBasedRememberMeServices rememberMeServices) {
        this.authenticationManager = authenticationManager;
        this.rememberMeServices = rememberMeServices;
        super.setFilterProcessesUrl("/api/user/login");
        super.setRememberMeServices(rememberMeServices);
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {
        try {
            fromBody = new ObjectMapper().readValue(request.getInputStream(), UserLogin.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    fromBody.getUsername(),
                    fromBody.getPassword());

            return authenticationManager.authenticate(authentication);
        } catch (IOException e) {
            throw new RuntimeException(ResponseUtils.UNPROCESSABLE_ENTITY_MESSAGE);
        }
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        AppUser appUser = (AppUser) authResult.getPrincipal();
        UserVM resUser = new UserVM(appUser);
        ResponseUtils.setResponseFields(response, 200, new ObjectMapper().writeValueAsString(resUser));
        SecurityContextHolder.getContext().setAuthentication(authResult);

        if (fromBody.isRememberMe()) {
            rememberMeServices.loginSuccess(request, response, authResult);
        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        throw new RuntimeException("Wrong username or password");
    }

}
