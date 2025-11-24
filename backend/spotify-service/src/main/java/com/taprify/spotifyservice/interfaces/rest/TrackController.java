package com.taprify.spotifyservice.interfaces.rest;

import com.taprify.spotifyservice.application.track.GetTracksHandler;
import com.taprify.spotifyservice.interfaces.rest.dto.TrackResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tracks")
@RequiredArgsConstructor
@Slf4j
public class TrackController {

    private final GetTracksHandler getTracksHandler;

    @GetMapping
    public ResponseEntity<List<TrackResponse>> getTracks() {
        log.info("GET /tracks - Fetching popular tracks");
        List<TrackResponse> tracks = getTracksHandler.handle();
        return ResponseEntity.ok(tracks);
    }
}
