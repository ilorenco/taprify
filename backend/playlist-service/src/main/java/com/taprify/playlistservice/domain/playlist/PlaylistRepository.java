package com.taprify.playlistservice.domain.playlist;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PlaylistRepository {
    Playlist save(Playlist playlist);
    Optional<Playlist> findById(UUID id);
    List<Playlist> findAllByUserId(UUID userId);
    void deleteById(UUID id);
    boolean existsByIdAndUserId(UUID id, UUID userId);
}
