package com.taprify.spotifyservice.application.album;

import com.taprify.spotifyservice.infrastructure.spotify.SpotifyApiClient;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyNewReleasesResponse;
import com.taprify.spotifyservice.interfaces.rest.dto.AlbumResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetNewReleasesHandler {

    private final SpotifyApiClient spotifyApiClient;

    private static final int DEFAULT_LIMIT = 20;

    public List<AlbumResponse> handle() {
        log.info("Fetching new releases from Spotify");

        try {
            SpotifyNewReleasesResponse response = spotifyApiClient.getNewReleases(DEFAULT_LIMIT);

            if (response == null || response.getAlbums() == null || response.getAlbums().getItems() == null) {
                log.warn("No new releases returned from Spotify API");
                return Collections.emptyList();
            }

            return response.getAlbums().getItems().stream()
                    .filter(album -> album != null)
                    .map(AlbumResponse::from)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Error fetching new releases", e);
            throw new RuntimeException("Failed to fetch new releases", e);
        }
    }
}
