import { TestBed } from '@angular/core/testing';
import { AudioPlayerService } from './audio-player.service';

describe('AudioPlayerService', () => {
    let service: AudioPlayerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AudioPlayerService]
        });
        service = TestBed.inject(AudioPlayerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with default state', () => {
        expect(service.isPlaying()).toBe(false);
        expect(service.getCurrentTime()).toBe(0);
        expect(service.getVolume()).toBe(1);
    });

    it('should play track', () => {
        const mockTrack = {
            id: 1,
            title: 'Test Track',
            artist: 'Test Artist',
            album: 'Test Album',
            genre: 'Rock',
            duration: 180,
            audioUrl: 'test.mp3'
        };

        service.play(mockTrack);
        expect(service.isPlaying()).toBe(true);
    });

    it('should pause playback', () => {
        service.pause();
        expect(service.isPlaying()).toBe(false);
    });

    it('should toggle play/pause', () => {
        const initialState = service.isPlaying();
        service.togglePlayPause();
        expect(service.isPlaying()).toBe(!initialState);
    });

    it('should set volume', () => {
        service.setVolume(0.5);
        expect(service.getVolume()).toBe(0.5);
    });

    it('should seek to position', () => {
        service.seek(60);
        expect(service.getCurrentTime()).toBe(60);
    });
});
