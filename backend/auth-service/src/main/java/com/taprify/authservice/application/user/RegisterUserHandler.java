package com.taprify.authservice.application.user;

import com.taprify.authservice.application.ports.PasswordHasher;
import com.taprify.authservice.domain.user.User;
import com.taprify.authservice.domain.user.UserRepository;
import com.taprify.authservice.domain.user.vo.Email;
import com.taprify.authservice.interfaces.rest.dto.user.UserResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class RegisterUserHandler {
    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;

    @Transactional
    public UserResponse handle(String name, String emailRaw, String password) {
        Email email = Email.of(emailRaw);

        if (userRepository.existsByEmail(email.getValue())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado");
        }

        String hash = passwordHasher.hash(password);
        User user = new User(name, hash, email);

        User saved = userRepository.save(user);
        return new UserResponse(
                saved.getId(),
                saved.getName(),
                saved.getEmail().getValue()
        );
    }
}
