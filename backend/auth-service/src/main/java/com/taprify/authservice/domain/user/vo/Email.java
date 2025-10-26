package com.taprify.authservice.domain.user.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
public class Email {

    @NotBlank
    @jakarta.validation.constraints.Email
    @Column(name = "email")
    private String value;

    public Email(String value) {
        this.value = value;
    }

    public static Email of(String value) {
        return new Email(value);
    }
}
