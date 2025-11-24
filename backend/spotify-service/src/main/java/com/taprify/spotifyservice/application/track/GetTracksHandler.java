package com.taprify.spotifyservice.application.track;

import com.taprify.spotifyservice.infrastructure.spotify.SpotifyApiClient;
import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyTracksResponse;
import com.taprify.spotifyservice.interfaces.rest.dto.TrackResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetTracksHandler {

    private final SpotifyApiClient spotifyApiClient;

    // IDs de tracks populares
    // Bohemian Rhapsody - Queen, Smells Like Teen Spirit - Nirvana, Billie Jean - Michael Jackson
    // Stairway to Heaven - Led Zeppelin, Imagine - John Lennon, Hotel California - Eagles
    // Sweet Child O' Mine - Guns N' Roses, Yesterday - The Beatles, Purple Haze - Jimi Hendrix
    // Like a Rolling Stone - Bob Dylan, What's Going On - Marvin Gaye, Respect - Aretha Franklin
    private static final String POPULAR_TRACK_IDS =
            "4u7EnebtmKWzUH433cf5Qv,4CeeEOM32jQcH3eN9Q2dGj,5ChkMS8OtdzJeqyybCc9R5," +
            "5CQ30WqJwcep0pYcV4AMNc,7pKfPomDEeI4TPT6EOYjn9,40riOy7x9W7GXjyGp4pjAv," +
            "7o2CTH4ctstm8TNelqjb51,2wUOj63MndH3cQYsAk5pb2,0wJoRiX5K5BxlqZTr16lnT," +
            "3AhXZa8sUQht0UEdBJgpGc,1yAwtBaoHLEDWAnWR87hBT,7s25THrKz86DM225dOYwnr";

    public List<TrackResponse> handle() {
        log.info("Fetching popular tracks from Spotify");

        try {
            SpotifyTracksResponse response = spotifyApiClient.getTracks(POPULAR_TRACK_IDS);

            if (response == null || response.getTracks() == null) {
                log.warn("No tracks returned from Spotify API");
                return Collections.emptyList();
            }

            return response.getTracks().stream()
                    .filter(track -> track != null)
                    .map(TrackResponse::from)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Error fetching tracks", e);
            throw new RuntimeException("Failed to fetch tracks", e);
        }
    }
}
