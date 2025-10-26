package com.taprify.authservice.infrastructure.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.taprify.authservice.application.ports.TokenService;
import com.taprify.authservice.domain.user.User;
import com.taprify.authservice.infrastructure.config.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
public class JwtTokenService implements TokenService {
    private final JwtProperties jwtProperties;

    @Override
    public TokenPair issue(User user) {
        Algorithm algorithm = Algorithm.HMAC256(jwtProperties.getSecret());
        
        Instant now = Instant.now();
        Instant expiresAt = now.plus(1, ChronoUnit.HOURS);
        
        String token = JWT.create()
                .withSubject(user.getId().toString())
                .withClaim("email", user.getEmail().getValue())
                .withClaim("name", user.getName())
                .withIssuedAt(now)
                .withExpiresAt(expiresAt)
                .sign(algorithm);

        long expiresIn = ChronoUnit.SECONDS.between(now, expiresAt);
        
        return new TokenPair(token, expiresIn);
    }
}
