package com.taprify.playlistservice.interfaces.rest.dto;

import com.taprify.playlistservice.domain.playlist.Playlist;

import java.util.UUID;

public record PlaylistResponse(
    UUID id,
    String name,
    UUID userId,
    String creatorName,
    int trackCount
) {
    public static PlaylistResponse from(Playlist playlist, int trackCount) {
        return new PlaylistResponse(
            playlist.getId(),
            playlist.getName(),
            playlist.getUserId(),
            playlist.getCreatorName(),
            trackCount
        );
    }
}
