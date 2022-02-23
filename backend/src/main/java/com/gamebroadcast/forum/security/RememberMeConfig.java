package com.gamebroadcast.forum.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

@Configuration
public class RememberMeConfig {

    private final UserConfig userConfig;
    private final DataSource dataSource;

    @Autowired
    public RememberMeConfig(UserConfig userConfig, DataSource dataSource) {
        this.userConfig = userConfig;
        this.dataSource = dataSource;
    }

    @Bean // TODO set secret key in .env
    public PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices() {
        PersistentTokenBasedRememberMeServices rememberMeServices = new PersistentTokenBasedRememberMeServices(
                "secretKeyIGuess", userConfig, persistentTokenRepository());
        rememberMeServices.setCookieName("rememberMe");
        rememberMeServices.setAlwaysRemember(true);

        return rememberMeServices;
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);

        return jdbcTokenRepository;
    }
}
