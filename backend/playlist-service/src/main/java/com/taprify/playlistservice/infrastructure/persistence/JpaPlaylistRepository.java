package com.taprify.playlistservice.infrastructure.persistence;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlist.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JpaPlaylistRepository implements PlaylistRepository {
    private final SpringDataPlaylistJpa springDataPlaylistJpa;

    @Override
    public Playlist save(Playlist playlist) {
        return springDataPlaylistJpa.save(playlist);
    }

    @Override
    public Optional<Playlist> findById(UUID id) {
        return springDataPlaylistJpa.findById(id);
    }

    @Override
    public List<Playlist> findAllByUserId(UUID userId) {
        return springDataPlaylistJpa.findAllByUserId(userId);
    }

    @Override
    public void deleteById(UUID id) {
        springDataPlaylistJpa.deleteById(id);
    }

    @Override
    public boolean existsByIdAndUserId(UUID id, UUID userId) {
        return springDataPlaylistJpa.existsByIdAndUserId(id, userId);
    }
}
