import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { Track, CreateTrackDto, UpdateTrackDto } from '../models/track.model';
import { environment } from '../../../environments/environment';
import { vi } from 'vitest';

describe('TrackService', () => {
    let service: TrackService;
    let httpMock: HttpTestingController;

    // Mock NotificationService since it's used in TrackService
    const notificationServiceMock = {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn()
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TrackService,
                { provide: 'NotificationService', useValue: notificationServiceMock }
            ]
        });
        service = TestBed.inject(TrackService);
        httpMock = TestBed.inject(HttpTestingController);

        // Handle the initial loadTracks call in constructor
        const req = httpMock.expectOne(`${environment.apiUrl}/tracks`);
        req.flush([]);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all tracks', async () => {
        const mockTracks: Track[] = [
            { id: 1, title: 'Track 1', artist: 'Artist 1', category: 'rock', description: 'Desc', duration: 180, audioUrl: 'url', isFavorite: false, dateAdded: new Date() }
        ];

        const tracksPromise = service.getAllTracks();

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTracks);

        const tracks = await tracksPromise;
        expect(tracks.length).toBe(1);
        expect(tracks).toEqual(mockTracks);
    });

    it('should get track by id', async () => {
        const mockTrack: Track = {
            id: 1,
            title: 'Track 1',
            artist: 'Artist 1',
            category: 'rock',
            description: 'Desc',
            duration: 180,
            audioUrl: 'url',
            isFavorite: false,
            dateAdded: new Date()
        };

        const trackPromise = service.getById(1);

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTrack);

        const track = await trackPromise;
        expect(track).toEqual(mockTrack);
    });

    it('should create track', async () => {
        const dto: CreateTrackDto = {
            title: 'New Track',
            artist: 'New Artist',
            category: 'jazz',
            description: 'Desc',
            audioFile: new File([''], 'song.mp3', { type: 'audio/mpeg' }),
            coverImage: ''
        };

        const createdTrack: Track = {
            id: 1,
            title: dto.title,
            artist: dto.artist,
            category: dto.category,
            description: dto.description,
            duration: 240,
            audioUrl: 'base64string',
            isFavorite: false,
            dateAdded: new Date()
        };

        // Since we cannot spy on private methods easily in strict TS, we assume
        // the service will attempt to process the file and call the API.
        // We will just mock the API call which confirms the flow reached that point.

        const createPromise = service.create(dto);

        // We expect the service to call POST after internal processing
        const req = httpMock.expectOne(`${environment.apiUrl}/tracks`);
        expect(req.request.method).toBe('POST');
        req.flush(createdTrack);

        const track = await createPromise;
        expect(track).toEqual(createdTrack);
    });

    it('should update track', async () => {
        const updateDto: UpdateTrackDto = {
            title: 'Updated Track',
            artist: 'Updated Artist',
            category: 'pop',
            description: 'Updated Desc'
        };

        const updatedTrack: Track = {
            id: 1,
            title: 'Updated Track',
            artist: 'Updated Artist',
            category: 'pop',
            description: 'Updated Desc',
            duration: 200,
            audioUrl: 'url',
            isFavorite: false,
            dateAdded: new Date()
        };

        const updatePromise = service.update(1, updateDto);

        const req = httpMock.expectOne(`${environment.apiUrl}/tracks/1`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedTrack);

        const track = await updatePromise;
        expect(track).toEqual(updatedTrack);
    });

    it('should delete track', async () => {
        const deletePromise = service.delete(1);

        // Service calls deleteTrack which calls HTTP DELETE
        const req = httpMock.expectOne(`${environment.apiUrl}/tracks/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});

        const success = await deletePromise;
        expect(success).toBe(true);
    });
});
