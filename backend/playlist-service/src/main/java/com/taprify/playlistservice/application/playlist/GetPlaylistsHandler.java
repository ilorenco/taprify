package com.taprify.playlistservice.application.playlist;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlist.PlaylistRepository;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetPlaylistsHandler {
    private final PlaylistRepository playlistRepository;

    @Transactional(readOnly = true)
    public List<PlaylistResponse> handle(UUID userId) {
        return playlistRepository.findAllByUserId(userId)
                .stream()
                .map(PlaylistResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public PlaylistResponse handleById(UUID playlistId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));
        return PlaylistResponse.from(playlist);
    }
}
