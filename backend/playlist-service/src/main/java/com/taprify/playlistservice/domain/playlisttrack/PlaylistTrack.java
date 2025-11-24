package com.taprify.playlistservice.domain.playlisttrack;

import com.taprify.playlistservice.domain.playlist.Playlist;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "playlist_tracks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistTrack {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_id", nullable = false)
    private Playlist playlist;

    @Column(nullable = false)
    private String spotifyTrackId;

    @Column(nullable = false, length = 200)
    private String trackName;

    @Column(nullable = false, length = 200)
    private String artistName;

    @Column
    private String imageUrl;

    @Column
    private Integer durationMs;

    @Column(nullable = false)
    private LocalDateTime addedAt;

    public static PlaylistTrack create(
        Playlist playlist,
        String spotifyTrackId,
        String trackName,
        String artistName,
        String imageUrl,
        Integer durationMs
    ) {
        PlaylistTrack track = new PlaylistTrack();
        track.setPlaylist(playlist);
        track.setSpotifyTrackId(spotifyTrackId);
        track.setTrackName(trackName);
        track.setArtistName(artistName);
        track.setImageUrl(imageUrl);
        track.setDurationMs(durationMs);
        track.setAddedAt(LocalDateTime.now());
        return track;
    }
}
