/**
 * @fileoverview Track Service - Core service for music track management
 * @see SPOT-14 Implement Track Service
 */
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
    Track,
    CreateTrackDto,
    UpdateTrackDto,
    LoadingState,
    SUPPORTED_AUDIO_FORMATS,
    MAX_FILE_SIZE,
    VALIDATION,
    AudioFile
} from '../models/track.model';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class TrackService {
    private readonly API_URL = 'http://localhost:8080/api/tracks';

    // Private signals for state
    private readonly _tracks = signal<Track[]>([]);
    private readonly _loadingState = signal<LoadingState>('idle');
    private readonly _error = signal<string | null>(null);
    private readonly _selectedTrack = signal<Track | null>(null);

    // Public readonly signals
    readonly tracks = this._tracks.asReadonly();
    readonly loadingState = this._loadingState.asReadonly();
    readonly error = this._error.asReadonly();
    readonly selectedTrack = this._selectedTrack.asReadonly();

    // Computed signals
    readonly isLoading = computed(() => this._loadingState() === 'loading');
    readonly hasError = computed(() => this._loadingState() === 'error');
    readonly trackCount = computed(() => this._tracks().length);
    readonly favoriteCount = computed(() => this._tracks().filter(t => t.isFavorite).length);
    readonly favoriteTracks = computed(() => this._tracks().filter(t => t.isFavorite));

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService
    ) {
        this.loadTracks();
    }

    /**
     * Get all tracks (for NgRx effects)
     */
    getAllTracks(): Promise<Track[]> {
        return firstValueFrom(this.http.get<Track[]>(this.API_URL));
    }

    /**
     * Add track (for NgRx effects)
     */
    addTrack(track: Track): Promise<void> {
        // Map Track model to Backend DTO if necessary, but since we use same structure mostly:
        // construct CreateTrackDTO-like object
        const payload = {
            title: track.title,
            artist: track.artist,
            category: track.category,
            description: track.description,
            duration: track.duration,
            audioUrl: track.audioUrl, // Changed from audioFileId to audioUrl
            coverImage: track.coverImage
        };
        // Note: The previous logic generated an ID and audioFileId.
        // We need to adjust 'create' method to handle the file conversion first.
        return firstValueFrom(this.http.post<void>(this.API_URL, payload));
    }

    /**
     * Update track (for NgRx effects)
     */
    updateTrack(track: Track): Promise<void> {
        return firstValueFrom(this.http.put<void>(`${this.API_URL}/${track.id}`, track));
    }

    /**
     * Delete track (for NgRx effects)
     */
    deleteTrack(id: string | number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.API_URL}/${id}`));
    }

    /**
     * Toggle favorite and return updated track (for NgRx effects)
     */
    toggleFavoriteWithReturn(id: string | number): Promise<Track> {
        return firstValueFrom(this.http.patch<Track>(`${this.API_URL}/${id}/favorite`, {}));
    }

    /**
     * Load all tracks from API
     */
    async loadTracks(): Promise<void> {
        this._loadingState.set('loading');
        this._error.set(null);

        try {
            const tracks = await this.getAllTracks();
            this._tracks.set(tracks);
            this._loadingState.set('success');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load tracks';
            this._error.set(message);
            this._loadingState.set('error');
            this.notificationService.error(message);
        }
    }

    /**
     * Get a track by ID through API
     */
    async getById(id: string | number): Promise<Track | null> {
        // First check local cache
        const cached = this._tracks().find(t => t.id === id);
        if (cached) {
            this._selectedTrack.set(cached);
            return cached;
        }

        try {
            const track = await firstValueFrom(this.http.get<Track>(`${this.API_URL}/${id}`));
            if (track) {
                this._selectedTrack.set(track);
            }
            return track;
        } catch (err) {
            this.notificationService.error('Failed to load track');
            return null;
        }
    }

    /**
     * Create a new track
     * Handles file conversion to Base64 and calls API
     */
    async create(dto: CreateTrackDto): Promise<Track | null> {
        // Validate inputs
        const validationError = this.validateTrackInput(dto);
        if (validationError) {
            this.notificationService.error(validationError);
            return null;
        }

        this._loadingState.set('loading');

        try {
            // Convert audio file to Base64
            const audioBase64 = await this.fileToBase64(dto.audioFile);

            // Create payload matching Backend CreateTrackDTO
            const payload = {
                title: dto.title.trim(),
                artist: dto.artist.trim(),
                category: dto.category,
                description: dto.description?.trim(),
                audioUrl: audioBase64, // Send Base64 directly
                coverImage: dto.coverImage,
                duration: await this.calculateDuration(dto.audioFile)
            };

            const createdTrack = await firstValueFrom(this.http.post<Track>(this.API_URL, payload));

            // Update local state
            this._tracks.update(tracks => [createdTrack, ...tracks]);
            this._loadingState.set('success');
            this.notificationService.success(`"${createdTrack.title}" added to library`);

            return createdTrack;
        } catch (err: any) {
            console.error('Create track error:', err);
            // Use backend error message if available
            const errorMsg = err.error?.message || err.message || 'Failed to create track';
            const message = `Failed to create track: ${errorMsg}`;
            this._error.set(message);
            this._loadingState.set('error');
            this.notificationService.error(message);
            return null;
        }
    }

    /**
     * Update an existing track
     */
    async update(id: string | number, dto: UpdateTrackDto): Promise<Track | null> {
        // Validate inputs if needed (omitted for brevity as per existing logic)

        this._loadingState.set('loading');

        try {
            // We need to merge with existing or send partial update. 
            // Backend expects UpdateTrackDTO.
            // Note: Frontend UpdateTrackDto might differ slightly from Backend one.
            // Assuming direct mapping works for now or construct payload.

            const payload = { ...dto }; // Backend DTO matches frontend DTO structure roughly.

            const updatedTrack = await firstValueFrom(this.http.put<Track>(`${this.API_URL}/${id}`, payload));

            // Update local state
            this._tracks.update(tracks =>
                tracks.map(t => t.id === id ? updatedTrack : t)
            );

            const selected = this._selectedTrack();
            if (selected?.id === id) {
                this._selectedTrack.set(updatedTrack);
            }

            this._loadingState.set('success');
            this.notificationService.success('Track updated successfully');

            return updatedTrack;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update track';
            this._error.set(message);
            this._loadingState.set('error');
            this.notificationService.error(message);
            return null;
        }
    }

    /**
     * Delete a track
     */
    async delete(id: string | number): Promise<boolean> {
        this._loadingState.set('loading');

        try {
            await this.deleteTrack(id);

            // Update local state
            this._tracks.update(tracks => tracks.filter(t => t.id !== id));

            if (this._selectedTrack()?.id === id) {
                this._selectedTrack.set(null);
            }

            this._loadingState.set('success');
            this.notificationService.success('Track removed from library');
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to delete track';
            this._error.set(message);
            this._loadingState.set('error');
            this.notificationService.error(message);
            return false;
        }
    }

    /**
     * Search tracks by title or artist (Local filtering for speed, or can be API)
     * Keeping it local for now as we load all tracks on init.
     */
    searchTracks(query: string): Track[] {
        if (!query.trim()) return this._tracks();
        const lowerQuery = query.toLowerCase();
        return this._tracks().filter(track =>
            track.title.toLowerCase().includes(lowerQuery) ||
            track.artist.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Filter tracks by category
     */
    filterByCategory(category: string): Track[] {
        if (!category || category === 'all') return this._tracks();
        return this._tracks().filter(track => track.category === category);
    }

    /**
     * Toggle favorite status for a track
     */
    async toggleFavorite(id: string | number): Promise<boolean> {
        try {
            const updatedTrack = await this.toggleFavoriteWithReturn(id);

            // Update local state
            this._tracks.update(tracks =>
                tracks.map(t => t.id === id ? updatedTrack : t)
            );

            const selected = this._selectedTrack();
            if (selected?.id === id) {
                this._selectedTrack.set(updatedTrack);
            }

            if (updatedTrack.isFavorite) {
                this.notificationService.success(`Added "${updatedTrack.title}" to favorites`);
            } else {
                this.notificationService.info(`Removed "${updatedTrack.title}" from favorites`);
            }

            return true;
        } catch (err) {
            this.notificationService.error('Failed to update favorite status');
            return false;
        }
    }

    // ============ HELPER METHODS ============

    /**
     * Convert File to Base64 String
     */
    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    /**
     * Validate track input data
     */
    private validateTrackInput(dto: CreateTrackDto): string | null {
        if (!dto.title?.trim()) return 'Title is required';
        if (dto.title.length > VALIDATION.TITLE_MAX_LENGTH) return `Title must be ${VALIDATION.TITLE_MAX_LENGTH} characters or less`;
        if (!dto.artist?.trim()) return 'Artist is required';
        if (dto.description && dto.description.length > VALIDATION.DESCRIPTION_MAX_LENGTH) return `Description must be ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters or less`;
        if (!dto.audioFile) return 'Audio file is required';
        // Limit for Base64 text storage
        if (dto.audioFile.size > MAX_FILE_SIZE) return `File size must be ${MAX_FILE_SIZE / (1024 * 1024)}MB or less`;
        if (!SUPPORTED_AUDIO_FORMATS.includes(dto.audioFile.type)) return 'Only MP3, WAV, and OGG formats are supported';
        return null;
    }

    /**
     * Calculate audio file duration using Web Audio API
     */
    private calculateDuration(file: File): Promise<number> {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.preload = 'metadata';
            audio.onloadedmetadata = () => {
                URL.revokeObjectURL(audio.src);
                resolve(Math.floor(audio.duration));
            };
            audio.onerror = () => {
                URL.revokeObjectURL(audio.src);
                reject(new Error('Failed to read audio file'));
            };
            audio.src = URL.createObjectURL(file);
        });
    }


}
