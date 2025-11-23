package com.taprify.playlistservice.infrastructure.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.taprify.playlistservice.infrastructure.config.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtValidator {
    private final JwtProperties jwtProperties;

    public DecodedJWT validate(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtProperties.getSecret());
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (Exception e) {
            throw new RuntimeException("Token JWT inválido: " + e.getMessage());
        }
    }

    public UUID extractUserId(String token) {
        DecodedJWT jwt = validate(token);
        return UUID.fromString(jwt.getSubject());
    }

    public String extractName(String token) {
        DecodedJWT jwt = validate(token);
        return jwt.getClaim("name").asString();
    }
}
