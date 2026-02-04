package com.recovery.spotibyeback21.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tracks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 200)
    private String artist;

    @Column(length = 50)
    private String category;

    @Column(length = 1000)
    private String description;

    @Column(name = "audio_url", nullable = false, columnDefinition = "TEXT")
    private String audioUrl;

    @Column(name = "cover_image", columnDefinition = "TEXT")
    private String coverImage;

    @Column(nullable = false)
    private Integer duration; // in seconds

    @Column(name = "is_favorite")
    private Boolean isFavorite = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
