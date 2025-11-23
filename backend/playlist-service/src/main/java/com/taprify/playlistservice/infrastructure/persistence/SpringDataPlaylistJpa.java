package com.taprify.playlistservice.infrastructure.persistence;

import com.taprify.playlistservice.domain.playlist.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpringDataPlaylistJpa extends JpaRepository<Playlist, UUID> {
    List<Playlist> findAllByUserId(UUID userId);
    boolean existsByIdAndUserId(UUID id, UUID userId);
}
