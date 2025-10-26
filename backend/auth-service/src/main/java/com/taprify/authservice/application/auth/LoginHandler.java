package com.taprify.authservice.application.auth;

import com.taprify.authservice.application.ports.PasswordHasher;
import com.taprify.authservice.application.ports.TokenService;
import com.taprify.authservice.domain.user.User;
import com.taprify.authservice.domain.user.UserRepository;
import com.taprify.authservice.domain.user.vo.Email;
import com.taprify.authservice.interfaces.rest.dto.auth.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginHandler {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;
    private final TokenService tokenService;

    public TokenResponse handle(String emailRaw, String password) {
        Email email = Email.of(emailRaw);
        Optional<User> userOptional = userRepository.findByEmail(email.getValue());

        if (!userOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
        }

        User user = userOptional.get();
        if (!passwordHasher.match(password, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
        }

        TokenService.TokenPair pair = tokenService.issue(user);
        return new TokenResponse(pair.token(), pair.expiresIn());
    }
}
