package com.taprify.spotifyservice.infrastructure.spotify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class SpotifyAlbumDto {
    private String id;
    private String name;
    private List<ImageDto> images;

    @JsonProperty("album_type")
    private String albumType;

    @JsonProperty("total_tracks")
    private Integer totalTracks;

    @JsonProperty("release_date")
    private String releaseDate;

    private List<ArtistDto> artists;

    @Data
    public static class ImageDto {
        private String url;
        private Integer height;
        private Integer width;
    }

    @Data
    public static class ArtistDto {
        private String id;
        private String name;
    }
}
