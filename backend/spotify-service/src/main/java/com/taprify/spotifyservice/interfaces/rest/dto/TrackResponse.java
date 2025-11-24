package com.taprify.spotifyservice.interfaces.rest.dto;

import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyTrackDto;

import java.util.List;

public record TrackResponse(
        String id,
        String name,
        String artist,
        String imageUrl,
        Integer durationMs,
        List<String> genres
) {
    public static TrackResponse from(SpotifyTrackDto spotifyTrack) {
        String imageUrl = spotifyTrack.getAlbum() != null
                && spotifyTrack.getAlbum().getImages() != null
                && !spotifyTrack.getAlbum().getImages().isEmpty()
                ? spotifyTrack.getAlbum().getImages().get(0).getUrl()
                : null;

        String artist = spotifyTrack.getArtists() != null && !spotifyTrack.getArtists().isEmpty()
                ? spotifyTrack.getArtists().get(0).getName()
                : "Unknown Artist";

        List<String> genres = List.of();

        return new TrackResponse(
                spotifyTrack.getId(),
                spotifyTrack.getName(),
                artist,
                imageUrl,
                spotifyTrack.getDurationMs(),
                genres
        );
    }
}
