package com.taprify.playlistservice.application.playlist;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlist.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeletePlaylistHandler {
    private final PlaylistRepository playlistRepository;

    @Transactional
    public void handle(UUID playlistId, UUID userId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));

        if (!playlist.getUserId().equals(userId)) {
            throw new RuntimeException("Você não tem permissão para deletar esta playlist");
        }

        playlistRepository.deleteById(playlistId);
    }
}
