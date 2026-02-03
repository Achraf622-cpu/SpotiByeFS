package com.recovery.spotibyeback21.repository;

import com.recovery.spotibyeback21.entity.Track;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TrackRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TrackRepository trackRepository;

    private Track track1;
    private Track track2;

    @BeforeEach
    void setUp() {
        track1 = new Track();
        track1.setTitle("Test Track 1");
        track1.setArtist("Test Artist 1");
        track1.setAlbum("Test Album 1");
        track1.setGenre("Rock");
        track1.setDuration(180);

        track2 = new Track();
        track2.setTitle("Test Track 2");
        track2.setArtist("Test Artist 2");
        track2.setAlbum("Test Album 2");
        track2.setGenre("Jazz");
        track2.setDuration(240);
    }

    @Test
    void shouldSaveTrack() {
        Track savedTrack = trackRepository.save(track1);

        assertThat(savedTrack).isNotNull();
        assertThat(savedTrack.getId()).isNotNull();
        assertThat(savedTrack.getTitle()).isEqualTo("Test Track 1");
    }

    @Test
    void shouldFindAllTracks() {
        entityManager.persist(track1);
        entityManager.persist(track2);
        entityManager.flush();

        List<Track> tracks = trackRepository.findAll();

        assertThat(tracks).hasSize(2);
        assertThat(tracks).extracting(Track::getTitle)
                .containsExactlyInAnyOrder("Test Track 1", "Test Track 2");
    }

    @Test
    void shouldFindTrackById() {
        Track persistedTrack = entityManager.persist(track1);
        entityManager.flush();

        Optional<Track> foundTrack = trackRepository.findById(persistedTrack.getId());

        assertThat(foundTrack).isPresent();
        assertThat(foundTrack.get().getTitle()).isEqualTo("Test Track 1");
    }

    @Test
    void shouldDeleteTrack() {
        Track persistedTrack = entityManager.persist(track1);
        entityManager.flush();

        trackRepository.deleteById(persistedTrack.getId());

        Optional<Track> deletedTrack = trackRepository.findById(persistedTrack.getId());
        assertThat(deletedTrack).isEmpty();
    }

    @Test
    void shouldUpdateTrack() {
        Track persistedTrack = entityManager.persist(track1);
        entityManager.flush();

        persistedTrack.setTitle("Updated Title");
        Track updatedTrack = trackRepository.save(persistedTrack);

        assertThat(updatedTrack.getTitle()).isEqualTo("Updated Title");
    }
}
