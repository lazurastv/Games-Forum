package com.gamebroadcast.forum.security;

import static com.gamebroadcast.forum.security.Role.ADMIN;
import static com.gamebroadcast.forum.security.Role.EDITOR;
import static com.gamebroadcast.forum.security.Role.USER;
import static com.gamebroadcast.forum.utils.ResponseUtils.SESSION_COOKIE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.SecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final UserConfig userConfig;
    private final PersistentTokenBasedRememberMeServices rememberMeServices;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable() // TODO remove in the future
                .addFilterBefore(new ExceptionFilter(), LoginFilter.class)
                .addFilter(new LoginFilter(authenticationManager(), rememberMeServices))
                .authorizeRequests()
                .antMatchers(GET, "**").permitAll()
                .antMatchers(POST, "**").permitAll()
                .expressionHandler(webExpressionHandler())
                .anyRequest()
                .authenticated()
                .and()
                .rememberMe().rememberMeServices(rememberMeServices);

        http
                .logout()
                .logoutUrl("/api/user/logout")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(NO_CONTENT));
    }

    @Override // TODO remove in the future
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/h2-console/**");
        web
                .ignoring()
                .antMatchers("/api/user/register");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    private DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userConfig);

        return provider;
    }

    private SecurityExpressionHandler<FilterInvocation> webExpressionHandler() {
        DefaultWebSecurityExpressionHandler defaultWebSecurityExpressionHandler = new DefaultWebSecurityExpressionHandler();
        defaultWebSecurityExpressionHandler.setRoleHierarchy(roleHierarchy());

        return defaultWebSecurityExpressionHandler;
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();

        String roleAdmin = "ROLE_" + ADMIN.name();
        String roleEditor = "ROLE_" + EDITOR.name();
        String roleUser = "ROLE_" + USER.name();

        String hierarchy = String.format("%s > %s \n %s > %s", roleAdmin, roleEditor, roleEditor, roleUser);
        roleHierarchy.setHierarchy(hierarchy);

        return roleHierarchy;
    }

    @Bean // TODO add frontend url and maybe tweak settings
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        configuration.setAllowedOrigins(Arrays.asList("https://localhost"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        // configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH",
        // "DELETE", "OPTIONS"));
        // configuration.setAllowedHeaders(Arrays.asList("authorization",
        // "content-type", "x-auth-token"));
        // configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean // TODO add extra params in the future
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();

        serializer.setCookieName(SESSION_COOKIE);
        serializer.setCookiePath("/");
        serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");

        return serializer;
    }
}
