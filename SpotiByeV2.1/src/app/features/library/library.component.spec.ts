import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Track } from '../../core/models/track.model';
import * as TrackActions from '../../store/tracks/track.actions';

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch loadTracks on init', () => {
        const dispatchSpy = spyOn(store, 'dispatch');
        component.ngOnInit();
        expect(dispatchSpy).toHaveBeenCalledWith(TrackActions.loadTracks());
    });

    it('should display tracks', () => {
        const mockTracks: Track[] = [
            { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', genre: 'Rock', duration: 180 }
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
