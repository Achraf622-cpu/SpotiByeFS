package com.recovery.spotibyeback21.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTrackDTO {
    
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must be less than 200 characters")
    private String title;
    
    @NotBlank(message = "Artist is required")
    @Size(max = 200, message = "Artist must be less than 200 characters")
    private String artist;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;
    
    @NotBlank(message = "Audio URL is required")
    private String audioUrl;
    
    private String coverImage;
    
    @NotNull(message = "Duration is required")
    private Integer duration;
}
