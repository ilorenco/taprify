package com.taprify.playlistservice.application.playlist;

import com.taprify.playlistservice.domain.playlist.Playlist;
import com.taprify.playlistservice.domain.playlist.PlaylistRepository;
import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrack;
import com.taprify.playlistservice.domain.playlisttrack.PlaylistTrackRepository;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AddTrackToPlaylistHandler {
    private final PlaylistRepository playlistRepository;
    private final PlaylistTrackRepository playlistTrackRepository;

    @Transactional
    public PlaylistResponse handle(
        UUID playlistId,
        UUID userId,
        String spotifyTrackId,
        String trackName,
        String artistName,
        String imageUrl,
        Integer durationMs
    ) {
        log.info("Adding track to playlist. PlaylistId: {}, UserId: {}, TrackId: {}", playlistId, userId, spotifyTrackId);

        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));

        log.info("Playlist found. Playlist userId: {}, Request userId: {}", playlist.getUserId(), userId);

        if (!playlist.getUserId().equals(userId)) {
            log.error("Permission denied. Playlist userId: {} != Request userId: {}", playlist.getUserId(), userId);
            throw new RuntimeException("Você não tem permissão para adicionar músicas nesta playlist");
        }

        // Check if track already exists in playlist
        if (playlistTrackRepository.existsByPlaylistIdAndSpotifyTrackId(playlistId, spotifyTrackId)) {
            throw new RuntimeException("Esta música já está na playlist");
        }

        PlaylistTrack track = PlaylistTrack.create(
            playlist,
            spotifyTrackId,
            trackName,
            artistName,
            imageUrl,
            durationMs
        );

        playlistTrackRepository.save(track);

        int trackCount = playlistTrackRepository.countByPlaylistId(playlistId);
        return PlaylistResponse.from(playlist, trackCount);
    }
}
