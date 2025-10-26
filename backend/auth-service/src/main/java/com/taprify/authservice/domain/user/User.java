package com.taprify.authservice.domain.user;

import com.taprify.authservice.domain.user.vo.Email;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "users")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Valid
    @Embedded
    private Email email;

    public User(String name, String password, @Valid Email email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}
