package com.taprify.spotifyservice.application.album;

import com.taprify.spotifyservice.infrastructure.spotify.SpotifyApiClient;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyAlbumDto;
import com.taprify.spotifyservice.interfaces.rest.dto.AlbumDetailsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetAlbumDetailsHandler {

    private final SpotifyApiClient spotifyApiClient;

    public AlbumDetailsResponse handle(String albumId) {
        log.info("Fetching album details for ID: {}", albumId);

        try {
            SpotifyAlbumDto album = spotifyApiClient.getAlbumById(albumId);

            if (album == null) {
                log.warn("No album found for ID: {}", albumId);
                throw new RuntimeException("Album not found");
            }

            return AlbumDetailsResponse.from(album);

        } catch (Exception e) {
            log.error("Error fetching album details for ID: {}", albumId, e);
            throw new RuntimeException("Failed to fetch album details", e);
        }
    }
}
