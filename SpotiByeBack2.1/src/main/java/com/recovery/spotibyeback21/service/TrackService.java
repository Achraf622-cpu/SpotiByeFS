package com.recovery.spotibyeback21.service;

import com.recovery.spotibyeback21.dto.CreateTrackDTO;
import com.recovery.spotibyeback21.dto.TrackDTO;
import com.recovery.spotibyeback21.dto.UpdateTrackDTO;
import com.recovery.spotibyeback21.entity.Track;
import com.recovery.spotibyeback21.exception.ResourceNotFoundException;
import com.recovery.spotibyeback21.mapper.TrackMapper;
import com.recovery.spotibyeback21.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TrackService {

    private final TrackRepository trackRepository;
    private final TrackMapper trackMapper;

    /**
     * Get all tracks
     */
    @Transactional(readOnly = true)
    public List<TrackDTO> getAllTracks() {
        log.info("Fetching all tracks");
        return trackRepository.findAll()
                .stream()
                .map(trackMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get track by ID
     */
    @Transactional(readOnly = true)
    public TrackDTO getTrackById(Long id) {
        log.info("Fetching track with ID: {}", id);
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Track not found with ID: " + id));
        return trackMapper.toDTO(track);
    }

    /**
     * Create new track
     */
    public TrackDTO createTrack(CreateTrackDTO createTrackDTO) {
        log.info("Creating new track: {}", createTrackDTO.getTitle());
        Track track = trackMapper.toEntity(createTrackDTO);
        Track savedTrack = trackRepository.save(track);
        return trackMapper.toDTO(savedTrack);
    }

    /**
     * Update existing track
     */
    public TrackDTO updateTrack(Long id, UpdateTrackDTO updateTrackDTO) {
        log.info("Updating track with ID: {}", id);
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Track not found with ID: " + id));

        if (updateTrackDTO.getTitle() != null) {
            track.setTitle(updateTrackDTO.getTitle());
        }
        if (updateTrackDTO.getArtist() != null) {
            track.setArtist(updateTrackDTO.getArtist());
        }
        if (updateTrackDTO.getCategory() != null) {
            track.setCategory(updateTrackDTO.getCategory());
        }
        if (updateTrackDTO.getDescription() != null) {
            track.setDescription(updateTrackDTO.getDescription());
        }
        if (updateTrackDTO.getCoverImage() != null) {
            track.setCoverImage(updateTrackDTO.getCoverImage());
        }
        if (updateTrackDTO.getIsFavorite() != null) {
            track.setIsFavorite(updateTrackDTO.getIsFavorite());
        }

        Track updatedTrack = trackRepository.save(track);
        return trackMapper.toDTO(updatedTrack);
    }

    /**
     * Delete track
     */
    public void deleteTrack(Long id) {
        log.info("Deleting track with ID: {}", id);
        if (!trackRepository.existsById(id)) {
            throw new ResourceNotFoundException("Track not found with ID: " + id);
        }
        trackRepository.deleteById(id);
    }

    /**
     * Toggle favorite status
     */
    public TrackDTO toggleFavorite(Long id) {
        log.info("Toggling favorite for track ID: {}", id);
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Track not found with ID: " + id));
        track.setIsFavorite(!track.getIsFavorite());
        Track updatedTrack = trackRepository.save(track);
        return trackMapper.toDTO(updatedTrack);
    }

    /**
     * Get favorite tracks
     */
    @Transactional(readOnly = true)
    public List<TrackDTO> getFavoriteTracks() {
        log.info("Fetching favorite tracks");
        return trackRepository.findByIsFavoriteTrue()
                .stream()
                .map(trackMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get tracks by category
     */
    @Transactional(readOnly = true)
    public List<TrackDTO> getTracksByCategory(String category) {
        log.info("Fetching tracks for category: {}", category);
        return trackRepository.findByCategory(category)
                .stream()
                .map(trackMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search tracks by query (title or artist)
     */
    @Transactional(readOnly = true)
    public List<TrackDTO> searchTracks(String query) {
        log.info("Searching tracks with query: {}", query);
        return trackRepository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(query, query)
                .stream()
                .map(trackMapper::toDTO)
                .collect(Collectors.toList());
    }
}
