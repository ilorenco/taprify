package com.taprify.authservice.application.ports;

public interface PasswordHasher {
    String hash(String rawPassword);
    boolean match(String rawPassword, String hashedPassword);
}
