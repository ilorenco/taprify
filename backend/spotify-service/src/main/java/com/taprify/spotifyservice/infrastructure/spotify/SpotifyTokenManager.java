package com.taprify.spotifyservice.infrastructure.spotify;

import com.taprify.spotifyservice.infrastructure.config.SpotifyConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.util.Base64;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class SpotifyTokenManager {

    private final SpotifyConfig spotifyConfig;
    private final WebClient.Builder webClientBuilder;

    private String accessToken;
    private Instant tokenExpiration;

    public String getAccessToken() {
        if (accessToken == null || isTokenExpired()) {
            log.info("Token expired or not available, requesting new token...");
            refreshToken();
        }
        return accessToken;
    }

    private boolean isTokenExpired() {
        if (tokenExpiration == null) {
            return true;
        }
        
        return Instant.now().isAfter(tokenExpiration.minusSeconds(300));
    }

    private void refreshToken() {
        String credentials = spotifyConfig.getClientId() + ":" + spotifyConfig.getClientSecret();
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "client_credentials");

        try {
            Map<String, Object> response = webClientBuilder.build()
                    .post()
                    .uri(spotifyConfig.getTokenUrl())
                    .header("Authorization", "Basic " + encodedCredentials)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .body(BodyInserters.fromFormData(formData))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null) {
                this.accessToken = (String) response.get("access_token");
                Integer expiresIn = (Integer) response.get("expires_in");
                this.tokenExpiration = Instant.now().plusSeconds(expiresIn);
                log.info("Successfully obtained new Spotify access token, expires in {} seconds", expiresIn);
            }
        } catch (Exception e) {
            log.error("Error obtaining Spotify access token", e);
            throw new RuntimeException("Failed to obtain Spotify access token", e);
        }
    }
}
