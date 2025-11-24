package com.taprify.playlistservice.interfaces.rest;

import com.taprify.playlistservice.application.playlist.AddTrackToPlaylistHandler;
import com.taprify.playlistservice.application.playlist.CreatePlaylistHandler;
import com.taprify.playlistservice.application.playlist.DeletePlaylistHandler;
import com.taprify.playlistservice.application.playlist.GetPlaylistDetailsHandler;
import com.taprify.playlistservice.application.playlist.GetPlaylistsHandler;
import com.taprify.playlistservice.application.playlist.UpdatePlaylistHandler;
import com.taprify.playlistservice.infrastructure.security.JwtValidator;
import com.taprify.playlistservice.interfaces.rest.dto.AddTrackRequest;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistDetailsResponse;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistRequest;
import com.taprify.playlistservice.interfaces.rest.dto.PlaylistResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/playlists")
@RequiredArgsConstructor
public class PlaylistController {
    private final CreatePlaylistHandler createPlaylistHandler;
    private final GetPlaylistsHandler getPlaylistsHandler;
    private final GetPlaylistDetailsHandler getPlaylistDetailsHandler;
    private final UpdatePlaylistHandler updatePlaylistHandler;
    private final DeletePlaylistHandler deletePlaylistHandler;
    private final AddTrackToPlaylistHandler addTrackToPlaylistHandler;
    private final JwtValidator jwtValidator;

    @GetMapping
    public ResponseEntity<List<PlaylistResponse>> getMyPlaylists(Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        List<PlaylistResponse> playlists = getPlaylistsHandler.handle(userId);
        return ResponseEntity.ok(playlists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaylistResponse> getPlaylistById(@PathVariable UUID id) {
        PlaylistResponse playlist = getPlaylistsHandler.handleById(id);
        return ResponseEntity.ok(playlist);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<PlaylistDetailsResponse> getPlaylistDetails(@PathVariable UUID id) {
        log.info("GET /playlists/{}/details - Getting playlist details", id);
        PlaylistDetailsResponse playlistDetails = getPlaylistDetailsHandler.handle(id);
        return ResponseEntity.ok(playlistDetails);
    }

    @PostMapping
    public ResponseEntity<PlaylistResponse> createPlaylist(
            @Valid @RequestBody PlaylistRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) {
        UUID userId = (UUID) authentication.getPrincipal();
        String token = extractToken(httpRequest);
        String creatorName = jwtValidator.extractName(token);

        PlaylistResponse playlist = createPlaylistHandler.handle(
            request.name(),
            userId,
            creatorName
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(playlist);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlaylistResponse> updatePlaylist(
            @PathVariable UUID id,
            @Valid @RequestBody PlaylistRequest request,
            Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        PlaylistResponse playlist = updatePlaylistHandler.handle(
            id,
            request.name(),
            userId
        );
        return ResponseEntity.ok(playlist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable UUID id, Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        deletePlaylistHandler.handle(id, userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/tracks")
    public ResponseEntity<PlaylistResponse> addTrackToPlaylist(
            @PathVariable UUID id,
            @Valid @RequestBody AddTrackRequest request,
            Authentication authentication) {
        log.info("POST /playlists/{}/tracks - Adding track to playlist", id);
        log.info("Authentication principal: {}", authentication.getPrincipal());

        UUID userId = (UUID) authentication.getPrincipal();
        PlaylistResponse playlist = addTrackToPlaylistHandler.handle(
            id,
            userId,
            request.spotifyTrackId(),
            request.trackName(),
            request.artistName(),
            request.imageUrl(),
            request.durationMs()
        );
        return ResponseEntity.ok(playlist);
    }

    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Token não encontrado");
    }
}
