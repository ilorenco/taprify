package com.taprify.spotifyservice.infrastructure.spotify.dto;

import lombok.Data;

import java.util.List;

@Data
public class SpotifyNewReleasesResponse {
    private AlbumsWrapper albums;

    @Data
    public static class AlbumsWrapper {
        private List<SpotifyAlbumDto> items;
        private Integer total;
        private Integer limit;
        private Integer offset;
    }
}
