package com.taprify.spotifyservice.interfaces.rest;

import com.taprify.spotifyservice.application.album.GetAlbumDetailsHandler;
import com.taprify.spotifyservice.application.album.GetAlbumRecommendationsHandler;
import com.taprify.spotifyservice.application.album.GetAlbumsHandler;
import com.taprify.spotifyservice.application.album.GetNewReleasesHandler;
import com.taprify.spotifyservice.interfaces.rest.dto.AlbumDetailsResponse;
import com.taprify.spotifyservice.interfaces.rest.dto.AlbumResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
@Slf4j
public class AlbumController {

    private final GetAlbumsHandler getAlbumsHandler;
    private final GetAlbumRecommendationsHandler getAlbumRecommendationsHandler;
    private final GetAlbumDetailsHandler getAlbumDetailsHandler;
    private final GetNewReleasesHandler getNewReleasesHandler;

    @GetMapping
    public ResponseEntity<List<AlbumResponse>> getAlbums() {
        log.info("GET /albums - Fetching popular albums");
        List<AlbumResponse> albums = getAlbumsHandler.handle();
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<AlbumResponse>> getAlbumRecommendations() {
        log.info("GET /albums/recommendations - Fetching album recommendations");
        List<AlbumResponse> albums = getAlbumRecommendationsHandler.handle();
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlbumDetailsResponse> getAlbumDetails(@PathVariable String id) {
        log.info("GET /albums/{} - Fetching album details", id);
        AlbumDetailsResponse albumDetails = getAlbumDetailsHandler.handle(id);
        return ResponseEntity.ok(albumDetails);
    }

    @GetMapping("/new-releases")
    public ResponseEntity<List<AlbumResponse>> getNewReleases() {
        log.info("GET /albums/new-releases - Fetching new releases");
        List<AlbumResponse> albums = getNewReleasesHandler.handle();
        return ResponseEntity.ok(albums);
    }
}
