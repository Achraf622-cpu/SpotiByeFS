package com.recovery.spotibyeback21.service;

import com.recovery.spotibyeback21.dto.CreateTrackDTO;
import com.recovery.spotibyeback21.dto.TrackDTO;
import com.recovery.spotibyeback21.dto.UpdateTrackDTO;
import com.recovery.spotibyeback21.entity.Track;
import com.recovery.spotibyeback21.exception.ResourceNotFoundException;
import com.recovery.spotibyeback21.mapper.TrackMapper;
import com.recovery.spotibyeback21.repository.TrackRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TrackServiceTest {

    @Mock
    private TrackRepository trackRepository;

    @Mock
    private TrackMapper trackMapper;

    @InjectMocks
    private TrackService trackService;

    private Track track;
    private TrackDTO trackDTO;
    private CreateTrackDTO createTrackDTO;
    private UpdateTrackDTO updateTrackDTO;

    @BeforeEach
    void setUp() {
        track = new Track();
        track.setId(1L);
        track.setTitle("Test Track");
        track.setArtist("Test Artist");
        track.setAlbum("Test Album");
        track.setGenre("Rock");
        track.setDuration(180);

        trackDTO = new TrackDTO(1L, "Test Track", "Test Artist", "Test Album", "Rock", 180, null, null);

        createTrackDTO = new CreateTrackDTO("Test Track", "Test Artist", "Test Album", "Rock", 180, null);

        updateTrackDTO = new UpdateTrackDTO("Updated Track", "Updated Artist", "Updated Album", "Jazz", 200, null);
    }

    @Test
    void shouldGetAllTracks() {
        when(trackRepository.findAll()).thenReturn(Arrays.asList(track));
        when(trackMapper.toDTO(any(Track.class))).thenReturn(trackDTO);

        List<TrackDTO> result = trackService.getAllTracks();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).title()).isEqualTo("Test Track");
        verify(trackRepository, times(1)).findAll();
    }

    @Test
    void shouldGetTrackById() {
        when(trackRepository.findById(1L)).thenReturn(Optional.of(track));
        when(trackMapper.toDTO(track)).thenReturn(trackDTO);

        TrackDTO result = trackService.getTrackById(1L);

        assertThat(result).isNotNull();
        assertThat(result.title()).isEqualTo("Test Track");
        verify(trackRepository, times(1)).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenTrackNotFound() {
        when(trackRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> trackService.getTrackById(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Track not found with id: 999");
    }

    @Test
    void shouldCreateTrack() {
        when(trackMapper.toEntity(createTrackDTO)).thenReturn(track);
        when(trackRepository.save(any(Track.class))).thenReturn(track);
        when(trackMapper.toDTO(track)).thenReturn(trackDTO);

        TrackDTO result = trackService.createTrack(createTrackDTO);

        assertThat(result).isNotNull();
        assertThat(result.title()).isEqualTo("Test Track");
        verify(trackRepository, times(1)).save(any(Track.class));
    }

    @Test
    void shouldUpdateTrack() {
        when(trackRepository.findById(1L)).thenReturn(Optional.of(track));
        when(trackRepository.save(any(Track.class))).thenReturn(track);
        when(trackMapper.toDTO(track)).thenReturn(trackDTO);

        TrackDTO result = trackService.updateTrack(1L, updateTrackDTO);

        assertThat(result).isNotNull();
        verify(trackRepository, times(1)).findById(1L);
        verify(trackRepository, times(1)).save(track);
    }

    @Test
    void shouldDeleteTrack() {
        when(trackRepository.existsById(1L)).thenReturn(true);
        doNothing().when(trackRepository).deleteById(1L);

        trackService.deleteTrack(1L);

        verify(trackRepository, times(1)).existsById(1L);
        verify(trackRepository, times(1)).deleteById(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistentTrack() {
        when(trackRepository.existsById(anyLong())).thenReturn(false);

        assertThatThrownBy(() -> trackService.deleteTrack(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Track not found with id: 999");
    }
}
