package com.taprify.playlistservice.domain.playlisttrack;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PlaylistTrackRepository extends JpaRepository<PlaylistTrack, UUID> {
    int countByPlaylistId(UUID playlistId);
    boolean existsByPlaylistIdAndSpotifyTrackId(UUID playlistId, String spotifyTrackId);
    List<PlaylistTrack> findByPlaylistIdOrderByAddedAtDesc(UUID playlistId);
}
