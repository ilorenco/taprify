package com.taprify.spotifyservice.interfaces.rest.dto;

import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyAlbumDto;

import java.util.List;
import java.util.stream.Collectors;

public record AlbumDetailsResponse(
        String id,
        String name,
        String imageUrl,
        String artist,
        Integer totalTracks,
        Long totalDurationMs,
        List<TrackItemResponse> tracks
) {
    public static AlbumDetailsResponse from(SpotifyAlbumDto spotifyAlbum) {
        String imageUrl = spotifyAlbum.getImages() != null && !spotifyAlbum.getImages().isEmpty()
                ? spotifyAlbum.getImages().get(0).getUrl()
                : null;

        String artist = spotifyAlbum.getArtists() != null && !spotifyAlbum.getArtists().isEmpty()
                ? spotifyAlbum.getArtists().get(0).getName()
                : "Unknown Artist";

        List<TrackItemResponse> tracks = List.of();
        Long totalDurationMs = 0L;

        if (spotifyAlbum.getTracks() != null && spotifyAlbum.getTracks().getItems() != null) {
            tracks = spotifyAlbum.getTracks().getItems().stream()
                    .map(TrackItemResponse::from)
                    .collect(Collectors.toList());

            totalDurationMs = spotifyAlbum.getTracks().getItems().stream()
                    .mapToLong(track -> track.getDurationMs() != null ? track.getDurationMs() : 0L)
                    .sum();
        }

        return new AlbumDetailsResponse(
                spotifyAlbum.getId(),
                spotifyAlbum.getName(),
                imageUrl,
                artist,
                spotifyAlbum.getTotalTracks(),
                totalDurationMs,
                tracks
        );
    }

    public record TrackItemResponse(
            String id,
            String name,
            Integer durationMs,
            Integer trackNumber,
            String artist
    ) {
        public static TrackItemResponse from(SpotifyAlbumDto.TrackItemDto trackItem) {
            String artist = trackItem.getArtists() != null && !trackItem.getArtists().isEmpty()
                    ? trackItem.getArtists().get(0).getName()
                    : "Unknown Artist";

            return new TrackItemResponse(
                    trackItem.getId(),
                    trackItem.getName(),
                    trackItem.getDurationMs(),
                    trackItem.getTrackNumber(),
                    artist
            );
        }
    }
}
