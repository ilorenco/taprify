package com.taprify.playlistservice.domain.playlist;

import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrack;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "playlists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false, length = 100)
    private String creatorName;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlaylistTrack> tracks = new ArrayList<>();

    public static Playlist create(String name, UUID userId, String creatorName) {
        Playlist playlist = new Playlist();
        playlist.setName(name);
        playlist.setUserId(userId);
        playlist.setCreatorName(creatorName);
        playlist.setTracks(new ArrayList<>());
        return playlist;
    }
}
