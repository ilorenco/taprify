package com.taprify.playlistservice.interfaces.rest.dto;

import jakarta.validation.constraints.NotBlank;

public record AddTrackRequest(
    @NotBlank(message = "Spotify track ID is required")
    String spotifyTrackId,

    @NotBlank(message = "Track name is required")
    String trackName,

    @NotBlank(message = "Artist name is required")
    String artistName,

    String imageUrl,

    Integer durationMs
) {}
