package com.taprify.playlistservice.application.playlist;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlist.PlaylistRepository;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreatePlaylistHandler {
    private final PlaylistRepository playlistRepository;

    @Transactional
    public PlaylistResponse handle(String name, UUID userId, String creatorName) {
        Playlist playlist = Playlist.create(name, userId, creatorName);
        Playlist savedPlaylist = playlistRepository.save(playlist);
        return PlaylistResponse.from(savedPlaylist);
    }
}
