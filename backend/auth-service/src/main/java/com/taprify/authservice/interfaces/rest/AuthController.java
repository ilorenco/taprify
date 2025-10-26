package com.taprify.authservice.interfaces.rest;

import com.taprify.authservice.application.auth.LoginHandler;
import com.taprify.authservice.application.user.RegisterUserHandler;
import com.taprify.authservice.interfaces.rest.dto.auth.LoginRequest;
import com.taprify.authservice.interfaces.rest.dto.auth.TokenResponse;
import com.taprify.authservice.interfaces.rest.dto.user.UserRequest;
import com.taprify.authservice.interfaces.rest.dto.user.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final RegisterUserHandler registerUserHandler;
    private final LoginHandler loginHandler;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRequest request) {
        UserResponse user = registerUserHandler.handle(
            request.name(), 
            request.email(), 
            request.password()
        );
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
        TokenResponse token = loginHandler.handle(request.email(), request.password());
        return ResponseEntity.ok(token);
    }
}
