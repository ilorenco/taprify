package com.taprify.authservice.infrastructure.persistence;

import com.taprify.authservice.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SpringDataUserJpa extends JpaRepository<User, UUID> {
    Optional<User> findByEmailValue(String email);
    boolean existsByEmailValue(String email);
}
