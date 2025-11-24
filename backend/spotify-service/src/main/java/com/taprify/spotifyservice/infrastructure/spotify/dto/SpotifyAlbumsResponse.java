package com.taprify.spotifyservice.infrastructure.spotify.dto;

import lombok.Data;

import java.util.List;

@Data
public class SpotifyAlbumsResponse {
    private List<SpotifyAlbumDto> albums;
}
