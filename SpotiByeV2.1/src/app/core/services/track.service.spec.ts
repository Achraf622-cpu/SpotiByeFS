import { TestBed } from '@angular/core/testing';
import { HttpClient TestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { Track } from '../models/track.model';
import { environment } from '../../../environments/environment';

describe('TrackService', () => {
    let service: TrackService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrackService]
        });
        service = TestBed.inject(TrackService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all tracks', () => {
        const mockTracks: Track[] = [
            { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', genre: 'Rock', duration: 180 }
        ];

        service.getAllTracks().subscribe(tracks => {
            expect(tracks.length).toBe(1);
            expect(tracks).toEqual(mockTracks);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTracks);
    });

    it('should get track by id', () => {
        const mockTrack: Track = {
            id: 1,
            title: 'Track 1',
            artist: 'Artist 1',
            album: 'Album 1',
            genre: 'Rock',
            duration: 180
        };

        service.getTrackById(1).subscribe(track => {
            expect(track).toEqual(mockTrack);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTrack);
    });

    it('should create track', () => {
        const newTrack: Partial<Track> = {
            title: 'New Track',
            artist: 'New Artist',
            album: 'New Album',
            genre: 'Jazz',
            duration: 240
        };

        const createdTrack: Track = { ...newTrack, id: 1 } as Track;

        service.createTrack(newTrack).subscribe(track => {
            expect(track).toEqual(createdTrack);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newTrack);
        req.flush(createdTrack);
    });

    it('should update track', () => {
        const updatedTrack: Track = {
            id: 1,
            title: 'Updated Track',
            artist: 'Updated Artist',
            album: 'Updated Album',
            genre: 'Pop',
            duration: 200
        };

        service.updateTrack(1, updatedTrack).subscribe(track => {
            expect(track).toEqual(updatedTrack);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks/1`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedTrack);
    });

    it('should delete track', () => {
        service.deleteTrack(1).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });
});
