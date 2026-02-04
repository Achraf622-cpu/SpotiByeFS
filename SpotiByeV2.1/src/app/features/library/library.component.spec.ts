import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Track } from '../../core/models/track.model';
import * as TrackActions from '../../store/tracks/track.actions';
import { vi } from 'vitest';

describe('LibraryComponent', () => {
    let component: LibraryComponent;
    let fixture: ComponentFixture<LibraryComponent>;
    let store: MockStore;

    const initialState = {
        tracks: {
            tracks: [],
            loading: false,
            error: null
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LibraryComponent],
            providers: [provideMockStore({ initialState })]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(LibraryComponent);
        component = fixture.componentInstance;
        // Do NOT call detectChanges here if we want to spy on ngOnInit if called automatically, 
        // but explicit call in test requires it not to run yet or spy first.
        // However, standard Angular runs ngOnInit on first detectChanges.
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch loadTracks on init', () => {
        const dispatchSpy = vi.spyOn(store, 'dispatch');
        fixture.detectChanges(); // This triggers ngOnInit
        expect(dispatchSpy).toHaveBeenCalledWith(TrackActions.loadTracks());
    });

    it('should display tracks', () => {
        const mockTracks: Track[] = [
            { id: 1, title: 'Track 1', artist: 'Artist 1', category: 'rock', description: 'Desc', duration: 180, audioUrl: 'url', isFavorite: false, dateAdded: new Date() }
        ];

        store.setState({
            tracks: {
                tracks: mockTracks,
                loading: false,
                error: null
            }
        });

        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.track-card')).toBeTruthy();
    });

    it('should show loading state', () => {
        store.setState({
            tracks: {
                tracks: [],
                loading: true,
                error: null
            }
        });

        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.loading')).toBeTruthy();
    });

    it('should show error state', () => {
        store.setState({
            tracks: {
                tracks: [],
                loading: false,
                error: 'Error loading tracks'
            }
        });

        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.error')).toBeTruthy();
    });
});
