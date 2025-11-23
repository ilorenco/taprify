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
    public static PlaylistResponse from(Playlist playlist) {
        return new PlaylistResponse(
            playlist.getId(),
            playlist.getName(),
            playlist.getUserId(),
            playlist.getCreatorName(),
            0 // Por enquanto retorna 0, será implementado quando integrar com Spotify
        );
    }
}
