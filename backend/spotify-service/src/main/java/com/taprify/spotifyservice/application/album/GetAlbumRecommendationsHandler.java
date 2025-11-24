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
public class GetAlbumRecommendationsHandler {

    private final SpotifyApiClient spotifyApiClient;

    // IDs de álbuns recomendados (diferentes da Home)
    // The Wall - Pink Floyd, OK Computer - Radiohead, Appetite for Destruction - Guns N' Roses
    // The Joshua Tree - U2, Purple Rain - Prince, Born to Run - Bruce Springsteen
    // Sgt. Pepper's - The Beatles, Pet Sounds - Beach Boys, What's Going On - Marvin Gaye
    // Kind of Blue - Miles Davis, Blue - Joni Mitchell, The Rise and Fall of Ziggy Stardust - David Bowie
    // Blood Sugar Sex Magik - RHCP, Ten - Pearl Jam, Dookie - Green Day
    // The Chronic - Dr. Dre, Illmatic - Nas, Ready to Die - Notorious B.I.G.
    private static final String RECOMMENDATION_ALBUM_IDS =
            "5Dbax7G8SWrP9xyzkOvy2F,6dVIqQ8qmQ5GBnJ9shOYGE,0lw68yx3MhKflWFqCsGkIs," +
            "6GjwtEZcfenmOf6l18N7T7,7nXJ5k4XgRj5OLg9m8V3zc,50o7kf2wLwVmOTVYJOTplm," +
            "6QaVfG1pHYl1z15ZxkvVDW,6vV5UrXcfyQD1wu4Qo2I9K,2v6ANhWhZBUKkg6pJJBs3B," +
            "1weenld61qoidwYuZ1GESA,1kkxSjlbc9LDnHHg13A7SX,48D1hRAMhBaVn0OnASyrjx," +
            "30Perjew8HyGkdSmqguYyg,0bwTbcuTCDe5oeGKJ2cqDP,4fSo5UPvPE28p8W8lCXKPa," +
            "0vE6mttRTBXRe9rKghyr1l,3kEtdS2pH6hKcMU9Wioob1,6lPb7Eoon6QPbscWbMsk6a";

    public List<AlbumResponse> handle() {
        log.info("Fetching album recommendations from Spotify");

        try {
            SpotifyAlbumsResponse response = spotifyApiClient.getAlbums(RECOMMENDATION_ALBUM_IDS);

            if (response == null || response.getAlbums() == null) {
                log.warn("No album recommendations returned from Spotify API");
                return Collections.emptyList();
            }

            return response.getAlbums().stream()
                    .filter(album -> album != null)
                    .map(AlbumResponse::from)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Error fetching album recommendations", e);
            throw new RuntimeException("Failed to fetch album recommendations", e);
        }
    }
}
