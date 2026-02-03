package com.recovery.spotibyeback21.repository;

import com.recovery.spotibyeback21.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {
    
    // Find all favorite tracks
    List<Track> findByIsFavoriteTrue();
    
    // Find tracks by category
    List<Track> findByCategory(String category);
    
    // Find tracks by artist (case-insensitive)
    List<Track> findByArtistContainingIgnoreCase(String artist);
    
    // Find tracks by title (case-insensitive)
    List<Track> findByTitleContainingIgnoreCase(String title);
    
    // Search tracks by title or artist
    List<Track> findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(String title, String artist);
}
