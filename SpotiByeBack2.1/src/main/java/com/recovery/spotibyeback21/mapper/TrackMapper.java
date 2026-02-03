package com.recovery.spotibyeback21.mapper;

import com.recovery.spotibyeback21.dto.CreateTrackDTO;
import com.recovery.spotibyeback21.dto.TrackDTO;
import com.recovery.spotibyeback21.entity.Track;
import org.springframework.stereotype.Component;

@Component
public class TrackMapper {
    
    public TrackDTO toDTO(Track track) {
        if (track == null) {
            return null;
        }
        
        TrackDTO dto = new TrackDTO();
        dto.setId(track.getId());
        dto.setTitle(track.getTitle());
        dto.setArtist(track.getArtist());
        dto.setCategory(track.getCategory());
        dto.setDescription(track.getDescription());
        dto.setAudioUrl(track.getAudioUrl());
        dto.setCoverImage(track.getCoverImage());
        dto.setDuration(track.getDuration());
        dto.setIsFavorite(track.getIsFavorite());
        dto.setCreatedAt(track.getCreatedAt());
        dto.setUpdatedAt(track.getUpdatedAt());
        
        return dto;
    }
    
    public Track toEntity(CreateTrackDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Track track = new Track();
        track.setTitle(dto.getTitle());
        track.setArtist(dto.getArtist());
        track.setCategory(dto.getCategory());
        track.setDescription(dto.getDescription());
        track.setAudioUrl(dto.getAudioUrl());
        track.setCoverImage(dto.getCoverImage());
        track.setDuration(dto.getDuration());
        track.setIsFavorite(false); // Default value
        
        return track;
    }
}
