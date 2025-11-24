package com.taprify.playlistservice.interfaces.rest.dto;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrack;

import java.util.List;
import java.util.UUID;

public record PlaylistDetailsResponse(
    UUID id,
    String name,
    UUID userId,
    String creatorName,
    int trackCount,
    List<PlaylistTrackResponse> tracks
) {
    public static PlaylistDetailsResponse from(Playlist playlist, List<PlaylistTrack> tracks) {
        return new PlaylistDetailsResponse(
            playlist.getId(),
            playlist.getName(),
            playlist.getUserId(),
            playlist.getCreatorName(),
            tracks.size(),
            tracks.stream()
                .map(PlaylistTrackResponse::from)
                .toList()
        );
    }
}
