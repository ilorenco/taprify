package com.taprify.spotifyservice.interfaces.rest;

import com.taprify.spotifyservice.application.album.GetAlbumsHandler;
import com.taprify.spotifyservice.interfaces.rest.dto.AlbumResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
@Slf4j
public class AlbumController {

    private final GetAlbumsHandler getAlbumsHandler;

    @GetMapping
    public ResponseEntity<List<AlbumResponse>> getAlbums() {
        log.info("GET /albums - Fetching popular albums");
        List<AlbumResponse> albums = getAlbumsHandler.handle();
        return ResponseEntity.ok(albums);
    }
}
