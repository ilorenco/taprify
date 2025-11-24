package com.taprify.spotifyservice.infrastructure.spotify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class SpotifyTrackDto {
    private String id;
    private String name;

    @JsonProperty("duration_ms")
    private Integer durationMs;

    private Integer popularity;

    @JsonProperty("preview_url")
    private String previewUrl;

    private AlbumDto album;
    private List<ArtistDto> artists;

    @Data
    public static class AlbumDto {
        private String id;
        private String name;
        private List<ImageDto> images;
    }

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
