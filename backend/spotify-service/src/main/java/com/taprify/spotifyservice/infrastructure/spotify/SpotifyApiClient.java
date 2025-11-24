package com.taprify.spotifyservice.infrastructure.spotify;

import com.taprify.spotifyservice.infrastructure.config.SpotifyConfig;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyAlbumsResponse;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyTracksResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
@Slf4j
public class SpotifyApiClient {

    private final SpotifyConfig spotifyConfig;
    private final SpotifyTokenManager tokenManager;
    private final WebClient.Builder webClientBuilder;

    public SpotifyAlbumsResponse getAlbums(String albumIds) {
        String token = tokenManager.getAccessToken();

        log.info("Fetching albums from Spotify API with IDs: {}", albumIds);

        try {
            SpotifyAlbumsResponse response = webClientBuilder.build()
                    .get()
                    .uri(spotifyConfig.getApiUrl() + "/albums?ids=" + albumIds)
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(SpotifyAlbumsResponse.class)
                    .block();

            log.info("Successfully fetched {} albums from Spotify",
                    response != null && response.getAlbums() != null ? response.getAlbums().size() : 0);

            return response;
        } catch (Exception e) {
            log.error("Error fetching albums from Spotify API", e);
            throw new RuntimeException("Failed to fetch albums from Spotify", e);
        }
    }

    public SpotifyTracksResponse getTracks(String trackIds) {
        String token = tokenManager.getAccessToken();

        log.info("Fetching tracks from Spotify API with IDs: {}", trackIds);

        try {
            SpotifyTracksResponse response = webClientBuilder.build()
                    .get()
                    .uri(spotifyConfig.getApiUrl() + "/tracks?ids=" + trackIds)
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(SpotifyTracksResponse.class)
                    .block();

            log.info("Successfully fetched {} tracks from Spotify",
                    response != null && response.getTracks() != null ? response.getTracks().size() : 0);

            return response;
        } catch (Exception e) {
            log.error("Error fetching tracks from Spotify API", e);
            throw new RuntimeException("Failed to fetch tracks from Spotify", e);
        }
    }
}
