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
        track.setCategory("Pop");
        track.setDescription("Great track");
        track.setAudioUrl("http://example.com/audio.mp3");
        track.setDuration(180);

        createTrackDTO = new CreateTrackDTO("New Track", "New Artist", "Jazz", "Amazing jazz",
                "http://example.com/new-audio.mp3", "http://example.com/cover.jpg", 240);
    }

    @Test
    void shouldMapEntityToDTO() {
        TrackDTO trackDTO = trackMapper.toDTO(track);

        assertThat(trackDTO).isNotNull();
        assertThat(trackDTO.getId()).isEqualTo(1L);
        assertThat(trackDTO.getTitle()).isEqualTo("Test Track");
        assertThat(trackDTO.getArtist()).isEqualTo("Test Artist");
        assertThat(trackDTO.getCategory()).isEqualTo("Pop");
        assertThat(trackDTO.getDescription()).isEqualTo("Great track");
        assertThat(trackDTO.getDuration()).isEqualTo(180);
    }

    @Test
    void shouldMapCreateDTOToEntity() {
        Track mappedTrack = trackMapper.toEntity(createTrackDTO);

        assertThat(mappedTrack).isNotNull();
        assertThat(mappedTrack.getTitle()).isEqualTo("New Track");
        assertThat(mappedTrack.getArtist()).isEqualTo("New Artist");
        assertThat(mappedTrack.getCategory()).isEqualTo("Jazz");
        assertThat(mappedTrack.getDescription()).isEqualTo("Amazing jazz");
        assertThat(mappedTrack.getDuration()).isEqualTo(240);
    }

    @Test
    void shouldHandleNullValues() {
        Track emptyTrack = new Track();

        TrackDTO trackDTO = trackMapper.toDTO(emptyTrack);

        assertThat(trackDTO).isNotNull();
        assertThat(trackDTO.getId()).isNull();
        assertThat(trackDTO.getTitle()).isNull();
    }
}
