package com.taprify.spotifyservice.infrastructure.spotify;

import com.taprify.spotifyservice.infrastructure.config.SpotifyConfig;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyAlbumDto;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyAlbumsResponse;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyNewReleasesResponse;
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
            SpotifyAlbumsResponse response = webClientBuilder
                    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024))
                    .build()
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
            SpotifyTracksResponse response = webClientBuilder
                    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024))
                    .build()
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

    public SpotifyAlbumDto getAlbumById(String albumId) {
        String token = tokenManager.getAccessToken();

        log.info("Fetching album details from Spotify API for album ID: {}", albumId);

        try {
            SpotifyAlbumDto response = webClientBuilder
                    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024))
                    .build()
                    .get()
                    .uri(spotifyConfig.getApiUrl() + "/albums/" + albumId)
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(SpotifyAlbumDto.class)
                    .block();

            log.info("Successfully fetched album details for: {}",
                    response != null ? response.getName() : "null");

            return response;
        } catch (Exception e) {
            log.error("Error fetching album details from Spotify API", e);
            throw new RuntimeException("Failed to fetch album details from Spotify", e);
        }
    }

    public SpotifyNewReleasesResponse getNewReleases(int limit) {
        String token = tokenManager.getAccessToken();

        log.info("Fetching new releases from Spotify API with limit: {}", limit);

        try {
            SpotifyNewReleasesResponse response = webClientBuilder
                    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024))
                    .build()
                    .get()
                    .uri(spotifyConfig.getApiUrl() + "/browse/new-releases?limit=" + limit)
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(SpotifyNewReleasesResponse.class)
                    .block();

            log.info("Successfully fetched {} new releases from Spotify",
                    response != null && response.getAlbums() != null && response.getAlbums().getItems() != null
                            ? response.getAlbums().getItems().size() : 0);

            return response;
        } catch (Exception e) {
            log.error("Error fetching new releases from Spotify API", e);
            throw new RuntimeException("Failed to fetch new releases from Spotify", e);
        }
    }
}
