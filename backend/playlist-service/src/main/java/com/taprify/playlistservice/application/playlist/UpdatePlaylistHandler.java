package com.taprify.playlistservice.application.playlist;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlist.PlaylistRepository;
import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrackRepository;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdatePlaylistHandler {
    private final PlaylistRepository playlistRepository;
    private final PlaylistTrackRepository playlistTrackRepository;

    @Transactional
    public PlaylistResponse handle(UUID playlistId, String name, UUID userId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));

        if (!playlist.getUserId().equals(userId)) {
            throw new RuntimeException("Você não tem permissão para editar esta playlist");
        }

        playlist.setName(name);

        Playlist updatedPlaylist = playlistRepository.save(playlist);
        int trackCount = playlistTrackRepository.countByPlaylistId(playlistId);
        return PlaylistResponse.from(updatedPlaylist, trackCount);
    }
}
