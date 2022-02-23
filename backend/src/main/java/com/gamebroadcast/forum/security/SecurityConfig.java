package com.gamebroadcast.forum.security;

import static com.gamebroadcast.forum.security.Role.ADMIN;
import static com.gamebroadcast.forum.security.Role.EDITOR;
import static com.gamebroadcast.forum.security.Role.USER;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final UserConfig userConfig;
    private final PersistentTokenBasedRememberMeServices rememberMeServices;

    @Autowired
    public SecurityConfig(
            PasswordEncoder passwordEncoder,
            UserConfig userConfig,
            PersistentTokenBasedRememberMeServices rememberMeServices) {
        this.passwordEncoder = passwordEncoder;
        this.userConfig = userConfig;
        this.rememberMeServices = rememberMeServices;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // TODO remove in the future
                .addFilterBefore(new ExceptionFilter(), LoginFilter.class)
                .addFilter(new LoginFilter(authenticationManager(), rememberMeServices))
                .authorizeRequests()
                .expressionHandler(webExpressionHandler())
                .anyRequest()
                .authenticated()
                .and()
                .rememberMe().rememberMeServices(rememberMeServices)
                .and()
                .logout().logoutUrl("/api/user/logout").invalidateHttpSession(true).clearAuthentication(true)
                .deleteCookies("sessionId").deleteCookies("rememberMe"); // TODO make filter instead
    }

    @Override // TODO remove in the future
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/h2-console/**");
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

    @Bean // TODO add extra params in the future
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setCookieName("sessionId");
        serializer.setCookiePath("/api/");
        serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
        return serializer;
    }
}
