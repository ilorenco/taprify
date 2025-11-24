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

    private TracksDto tracks;

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

    @Data
    public static class TracksDto {
        private List<TrackItemDto> items;
        private Integer total;
    }

    @Data
    public static class TrackItemDto {
        private String id;
        private String name;

        @JsonProperty("duration_ms")
        private Integer durationMs;

        @JsonProperty("track_number")
        private Integer trackNumber;

        private List<ArtistDto> artists;
    }
}
