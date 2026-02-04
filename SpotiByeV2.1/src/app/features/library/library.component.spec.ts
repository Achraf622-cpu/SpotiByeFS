import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library.component';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { Track } from '../../core/models/track.model';
import { vi } from 'vitest';
import { signal } from '@angular/core';

describe('LibraryComponent', () => {
    let component: LibraryComponent;
    let fixture: ComponentFixture<LibraryComponent>;

    // Mock Services with Signals
    const mockTrackService = {
        tracks: signal<Track[]>([]),
        loadingState: signal('success'),
        error: signal(null),
        toggleFavorite: vi.fn().mockReturnValue(Promise.resolve(true))
    };

    const mockPlayerService = {
        currentTrack: signal(null),
        isPlaying: signal(false),
        togglePlay: vi.fn(),
        setQueue: vi.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LibraryComponent],
            providers: [
                { provide: TrackService, useValue: mockTrackService },
                { provide: AudioPlayerService, useValue: mockPlayerService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LibraryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display tracks', () => {
        const mockTracks: Track[] = [
            { id: 1, title: 'Track 1', artist: 'Artist 1', category: 'rock', description: 'Desc', duration: 180, audioUrl: 'url', isFavorite: false, dateAdded: new Date() }
        ];

        // Update signal
        mockTrackService.tracks.set(mockTracks);
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('app-track-card')).toBeTruthy();
    });

    it('should filter tracks by search', () => {
        const mockTracks: Track[] = [
            { id: 1, title: 'Alpha', artist: 'Artist 1', category: 'rock', duration: 180, audioUrl: 'url', isFavorite: false, dateAdded: new Date() },
            { id: 2, title: 'Beta', artist: 'Artist 2', category: 'pop', duration: 180, audioUrl: 'url', isFavorite: false, dateAdded: new Date() }
        ];
        mockTrackService.tracks.set(mockTracks);
        fixture.detectChanges();

        component.searchQuery.set('Alpha');
        fixture.detectChanges();

        expect(component.filteredTracks().length).toBe(1);
        expect(component.filteredTracks()[0].title).toBe('Alpha');
    });
});
