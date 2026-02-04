package com.recovery.spotibyeback21.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recovery.spotibyeback21.dto.CreateTrackDTO;
import com.recovery.spotibyeback21.dto.TrackDTO;
import com.recovery.spotibyeback21.dto.TrackDetailDTO;
import com.recovery.spotibyeback21.dto.UpdateTrackDTO;
import com.recovery.spotibyeback21.exception.ResourceNotFoundException;
import com.recovery.spotibyeback21.service.TrackService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TrackController.class)
class TrackControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @MockBean
        private TrackService trackService;

        private TrackDTO trackDTO;
        private TrackDetailDTO trackDetailDTO;
        private CreateTrackDTO createTrackDTO;
        private UpdateTrackDTO updateTrackDTO;

        @BeforeEach
        void setUp() {
                trackDTO = new TrackDTO(1L, "Test Track", "Test Artist", "Pop", "Great track",
                                "http://example.com/cover.jpg", 180, false, null, null);

                trackDetailDTO = new TrackDetailDTO("http://example.com/audio.mp3");
                trackDetailDTO.setId(1L);
                trackDetailDTO.setTitle("Test Track");
                trackDetailDTO.setArtist("Test Artist");
                trackDetailDTO.setCategory("Pop");
                trackDetailDTO.setDescription("Great track");
                trackDetailDTO.setCoverImage("http://example.com/cover.jpg");
                trackDetailDTO.setDuration(180);

                createTrackDTO = new CreateTrackDTO("Test Track", "Test Artist", "Pop", "Great track",
                                "http://example.com/audio.mp3", "http://example.com/cover.jpg", 180);
                updateTrackDTO = new UpdateTrackDTO("Updated Track", "Updated Artist", "Jazz", "Updated description",
                                "http://example.com/updated-cover.jpg", false);
        }

        @Test
        void shouldGetAllTracks() throws Exception {
                List<TrackDTO> tracks = Arrays.asList(trackDTO);
                when(trackService.getAllTracks()).thenReturn(tracks);

                mockMvc.perform(get("/api/tracks"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].title").value("Test Track"))
                                .andExpect(jsonPath("$[0].artist").value("Test Artist"));

                verify(trackService, times(1)).getAllTracks();
        }

        @Test
        void shouldGetTrackById() throws Exception {
                when(trackService.getTrackById(1L)).thenReturn(trackDetailDTO);

                mockMvc.perform(get("/api/tracks/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1))
                                .andExpect(jsonPath("$.title").value("Test Track"));

                verify(trackService, times(1)).getTrackById(1L);
        }

        @Test
        void shouldReturn404WhenTrackNotFound() throws Exception {
                when(trackService.getTrackById(anyLong()))
                                .thenThrow(new ResourceNotFoundException("Track not found with id: 999"));

                mockMvc.perform(get("/api/tracks/999"))
                                .andExpect(status().isNotFound());
        }

        @Test
        void shouldCreateTrack() throws Exception {
                when(trackService.createTrack(any(CreateTrackDTO.class))).thenReturn(trackDetailDTO);

                mockMvc.perform(post("/api/tracks")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(createTrackDTO)))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.title").value("Test Track"));

                verify(trackService, times(1)).createTrack(any(CreateTrackDTO.class));
        }

        @Test
        void shouldUpdateTrack() throws Exception {
                when(trackService.updateTrack(anyLong(), any(UpdateTrackDTO.class))).thenReturn(trackDTO);

                mockMvc.perform(put("/api/tracks/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(updateTrackDTO)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.title").value("Test Track"));

                verify(trackService, times(1)).updateTrack(anyLong(), any(UpdateTrackDTO.class));
        }

        @Test
        void shouldDeleteTrack() throws Exception {
                doNothing().when(trackService).deleteTrack(1L);

                mockMvc.perform(delete("/api/tracks/1"))
                                .andExpect(status().isNoContent());

                verify(trackService, times(1)).deleteTrack(1L);
        }
}
