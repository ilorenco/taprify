package com.taprify.playlistservice.application.playlist;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlist.PlaylistRepository;
import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrack;
import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrackRepository;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistDetailsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetPlaylistDetailsHandler {
    private final PlaylistRepository playlistRepository;
    private final PlaylistTrackRepository playlistTrackRepository;

    @Transactional(readOnly = true)
    public PlaylistDetailsResponse handle(UUID playlistId) {
        log.info("Getting playlist details for playlistId: {}", playlistId);

        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));

        List<PlaylistTrack> tracks = playlistTrackRepository.findByPlaylistIdOrderByAddedAtDesc(playlistId);

        log.info("Found playlist with {} tracks", tracks.size());

        return PlaylistDetailsResponse.from(playlist, tracks);
    }
}
