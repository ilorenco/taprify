package com.taprify.spotifyservice.interfaces.rest.dto;

import com.taprify.spotifyservice.infrastructure.spotify.dto.SpotifyAlbumDto;

public record AlbumResponse(
        String id,
        String name,
        String imageUrl,
        String artist
) {
    public static AlbumResponse from(SpotifyAlbumDto spotifyAlbum) {
        String imageUrl = spotifyAlbum.getImages() != null && !spotifyAlbum.getImages().isEmpty()
                ? spotifyAlbum.getImages().get(0).getUrl()
                : null;

        String artist = spotifyAlbum.getArtists() != null && !spotifyAlbum.getArtists().isEmpty()
                ? spotifyAlbum.getArtists().get(0).getName()
                : "Unknown Artist";

        return new AlbumResponse(
                spotifyAlbum.getId(),
                spotifyAlbum.getName(),
                imageUrl,
                artist
        );
    }
}
