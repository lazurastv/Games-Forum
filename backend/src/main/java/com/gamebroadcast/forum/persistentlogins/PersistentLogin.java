package com.gamebroadcast.forum.persistentlogins;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "persistent_logins")
public class PersistentLogin {

    @Column(name = "username", nullable = false, length = 64)
    private String username;

    @Id
    @Column(name = "series", nullable = false, length = 64)
    private String series;

    @Column(name = "token", nullable = false, length = 64)
    private String token;

    @Column(name = "last_used", nullable = false)
    private Timestamp lastUsed;
}
