package com.taprify.authservice.application.ports;

import com.taprify.authservice.domain.user.User;

public interface TokenService {
    TokenPair issue(User user);
    record TokenPair(String token, long expiresIn) {}
}
