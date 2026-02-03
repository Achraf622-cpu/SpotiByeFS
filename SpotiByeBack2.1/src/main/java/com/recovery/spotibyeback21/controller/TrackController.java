package com.recovery.spotibyeback21.controller;

import com.recovery.spotibyeback21.dto.CreateTrackDTO;
import com.recovery.spotibyeback21.dto.TrackDTO;
import com.recovery.spotibyeback21.dto.UpdateTrackDTO;
import com.recovery.spotibyeback21.service.TrackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tracks")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class TrackController {

    private final TrackService trackService;

    /**
     * GET /api/tracks - Get all tracks
     * GET /api/tracks?category=pop - Get tracks by category
     * GET /api/tracks?search=query - Search tracks
     * GET /api/tracks?favorites=true - Get favorite tracks
     */
    @GetMapping
    public ResponseEntity<List<TrackDTO>> getTracks(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean favorites) {

        log.info("GET /api/tracks - category: {}, search: {}, favorites: {}", category, search, favorites);

        List<TrackDTO> tracks;

        if (favorites != null && favorites) {
            tracks = trackService.getFavoriteTracks();
        } else if (search != null && !search.isBlank()) {
            tracks = trackService.searchTracks(search);
        } else if (category != null && !category.isBlank()) {
            tracks = trackService.getTracksByCategory(category);
        } else {
            tracks = trackService.getAllTracks();
        }

        return ResponseEntity.ok(tracks);
    }

    /**
     * GET /api/tracks/{id} - Get track by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<TrackDTO> getTrackById(@PathVariable Long id) {
        log.info("GET /api/tracks/{}", id);
        TrackDTO track = trackService.getTrackById(id);
        return ResponseEntity.ok(track);
    }

    /**
     * POST /api/tracks - Create new track
     */
    @PostMapping
    public ResponseEntity<TrackDTO> createTrack(@Valid @RequestBody CreateTrackDTO createTrackDTO) {
        log.info("POST /api/tracks - Creating track: {}", createTrackDTO.getTitle());
        TrackDTO createdTrack = trackService.createTrack(createTrackDTO);
        return new ResponseEntity<>(createdTrack, HttpStatus.CREATED);
    }

    /**
     * PUT /api/tracks/{id} - Update track
     */
    @PutMapping("/{id}")
    public ResponseEntity<TrackDTO> updateTrack(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTrackDTO updateTrackDTO) {
        log.info("PUT /api/tracks/{} - Updating track", id);
        TrackDTO updatedTrack = trackService.updateTrack(id, updateTrackDTO);
        return ResponseEntity.ok(updatedTrack);
    }

    /**
     * DELETE /api/tracks/{id} - Delete track
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        log.info("DELETE /api/tracks/{}", id);
        trackService.deleteTrack(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * PATCH /api/tracks/{id}/favorite - Toggle favorite status
     */
    @PatchMapping("/{id}/favorite")
    public ResponseEntity<TrackDTO> toggleFavorite(@PathVariable Long id) {
        log.info("PATCH /api/tracks/{}/favorite", id);
        TrackDTO track = trackService.toggleFavorite(id);
        return ResponseEntity.ok(track);
    }
}
