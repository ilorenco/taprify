package com.taprify.spotifyservice.infrastructure.spotify.dto;

import lombok.Data;

import java.util.List;

@Data
public class SpotifyTracksResponse {
    private List<SpotifyTrackDto> tracks;
}
