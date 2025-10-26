package com.taprify.authservice.interfaces.rest.dto.auth;

public record TokenResponse(
    String token,
    long expiresIn
) {}
