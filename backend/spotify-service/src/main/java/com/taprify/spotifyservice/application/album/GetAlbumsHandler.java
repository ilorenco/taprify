package com.taprify.spotifyservice.application.album;

import com.taprify.spotifyservice.infrastructure.spotify.SpotifyApiClient;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyAlbumsResponse;
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
public class GetAlbumsHandler {

    private final SpotifyApiClient spotifyApiClient;

    // IDs de álbuns populares
    // Thriller - Michael Jackson, Abbey Road - The Beatles, The Dark Side of the Moon - Pink Floyd
    // Back in Black - AC/DC, Rumours - Fleetwood Mac, Led Zeppelin IV, Nevermind - Nirvana
    private static final String POPULAR_ALBUM_IDS =
            "2ANVost0y2y52ema1E9xAZ,0ETFjACtuP2ADo6LFhL6HN,4LH4d3cOWNNsVw41Gqt2kv," +
            "6mUdeDZCsExyJLMdAfDuwh,0BwWUstDMUbgq2NYONRqlu,1Ugd8M51wRnhTd26yL1K7C," +
            "2guirTSEqLizK7j9i1MTTZ";

    public List<AlbumResponse> handle() {
        log.info("Fetching popular albums from Spotify");

        try {
            SpotifyAlbumsResponse response = spotifyApiClient.getAlbums(POPULAR_ALBUM_IDS);

            if (response == null || response.getAlbums() == null) {
                log.warn("No albums returned from Spotify API");
                return Collections.emptyList();
            }

            return response.getAlbums().stream()
                    .filter(album -> album != null)
                    .map(AlbumResponse::from)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Error fetching albums", e);
            throw new RuntimeException("Failed to fetch albums", e);
        }
    }
}
