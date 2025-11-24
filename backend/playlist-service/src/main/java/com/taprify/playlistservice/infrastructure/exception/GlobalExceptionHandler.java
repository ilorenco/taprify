package com.taprify.playlistservice.infrastructure.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        log.error("Runtime exception occurred: {}", ex.getMessage(), ex);

        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());

        // Se a mensagem indicar falta de permissão, retorna 403
        if (ex.getMessage() != null && ex.getMessage().contains("permissão")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
        }

        // Se for "não encontrada", retorna 404
        if (ex.getMessage() != null && ex.getMessage().contains("não encontrada")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        // Para outros casos, retorna 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        log.error("Unexpected exception occurred: {}", ex.getMessage(), ex);

        Map<String, String> error = new HashMap<>();
        error.put("message", "Erro interno no servidor");

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
