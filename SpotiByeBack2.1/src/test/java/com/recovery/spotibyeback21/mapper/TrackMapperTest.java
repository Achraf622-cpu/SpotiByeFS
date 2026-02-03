package com.recovery.spotibyeback21.mapper;

import com.recovery.spotibyeback21.dto.CreateTrackDTO;
import com.recovery.spotibyeback21.dto.TrackDTO;
import com.recovery.spotibyeback21.entity.Track;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TrackMapperTest {

    private TrackMapper trackMapper;
    private Track track;
    private CreateTrackDTO createTrackDTO;

    @BeforeEach
    void setUp() {
        trackMapper = new TrackMapper();

        track = new Track();
        track.setId(1L);
        track.setTitle("Test Track");
        track.setArtist("Test Artist");
        track.setAlbum("Test Album");
        track.setGenre("Rock");
        track.setDuration(180);

        createTrackDTO = new CreateTrackDTO("New Track", "New Artist", "New Album", "Jazz", 240, null);
    }

    @Test
    void shouldMapEntityToDTO() {
        TrackDTO trackDTO = trackMapper.toDTO(track);

        assertThat(trackDTO).isNotNull();
        assertThat(trackDTO.id()).isEqualTo(1L);
        assertThat(trackDTO.title()).isEqualTo("Test Track");
        assertThat(trackDTO.artist()).isEqualTo("Test Artist");
        assertThat(trackDTO.album()).isEqualTo("Test Album");
        assertThat(trackDTO.genre()).isEqualTo("Rock");
        assertThat(trackDTO.duration()).isEqualTo(180);
    }

    @Test
    void shouldMapCreateDTOToEntity() {
        Track mappedTrack = trackMapper.toEntity(createTrackDTO);

        assertThat(mappedTrack).isNotNull();
        assertThat(mappedTrack.getTitle()).isEqualTo("New Track");
        assertThat(mappedTrack.getArtist()).isEqualTo("New Artist");
        assertThat(mappedTrack.getAlbum()).isEqualTo("New Album");
        assertThat(mappedTrack.getGenre()).isEqualTo("Jazz");
        assertThat(mappedTrack.getDuration()).isEqualTo(240);
    }

    @Test
    void shouldHandleNullValues() {
        Track emptyTrack = new Track();

        TrackDTO trackDTO = trackMapper.toDTO(emptyTrack);

        assertThat(trackDTO).isNotNull();
        assertThat(trackDTO.id()).isNull();
        assertThat(trackDTO.title()).isNull();
    }
}
