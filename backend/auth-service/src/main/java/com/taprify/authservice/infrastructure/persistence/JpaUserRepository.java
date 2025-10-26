package com.taprify.authservice.infrastructure.persistence;

import com.taprify.authservice.domain.user.User;
import com.taprify.authservice.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JpaUserRepository implements UserRepository {
    private final SpringDataUserJpa springDataUserJpa;

    @Override
    public User save(User user) {
        return springDataUserJpa.save(user);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return springDataUserJpa.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return springDataUserJpa.findByEmailValue(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return springDataUserJpa.existsByEmailValue(email);
    }
}
