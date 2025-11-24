package com.taprify.playlistservice.interfaces.rest.dto;

import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrack;

import java.time.LocalDateTime;
import java.util.UUID;

public record PlaylistTrackResponse(
    UUID id,
    String spotifyTrackId,
    String trackName,
    String artistName,
    String imageUrl,
    Integer durationMs,
    LocalDateTime addedAt
) {
    public static PlaylistTrackResponse from(PlaylistTrack track) {
        return new PlaylistTrackResponse(
            track.getId(),
            track.getSpotifyTrackId(),
            track.getTrackName(),
            track.getArtistName(),
            track.getImageUrl(),
            track.getDurationMs(),
            track.getAddedAt()
        );
    }
}
