/**
 * Track State Reducer
 */
import { createReducer, on } from '@ngrx/store';
import { Track } from '../../core/models/track.model';
import * as TrackActions from './track.actions';

export interface TrackState {
    tracks: Track[];
    loading: boolean;
    error: string | null;
}

export const initialState: TrackState = {
    tracks: [],
    loading: false,
    error: null
};

export const trackReducer = createReducer(
    initialState,

    // Load Tracks
    on(TrackActions.loadTracks, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
        ...state,
        tracks,
        loading: false
    })),
    on(TrackActions.loadTracksFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Add Track
    on(TrackActions.addTrack, (state) => ({
        ...state,
        loading: true
    })),
    on(TrackActions.addTrackSuccess, (state, { track }) => ({
        ...state,
        tracks: [...state.tracks, track],
        loading: false
    })),
    on(TrackActions.addTrackFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update Track
    on(TrackActions.updateTrack, (state) => ({
        ...state,
        loading: true
    })),
    on(TrackActions.updateTrackSuccess, (state, { track }) => ({
        ...state,
        tracks: state.tracks.map(t => t.id === track.id ? track : t),
        loading: false
    })),
    on(TrackActions.updateTrackFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete Track
    on(TrackActions.deleteTrack, (state) => ({
        ...state,
        loading: true
    })),
    on(TrackActions.deleteTrackSuccess, (state, { id }) => ({
        ...state,
        tracks: state.tracks.filter(t => t.id !== id),
        loading: false
    })),
    on(TrackActions.deleteTrackFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Toggle Favorite
    on(TrackActions.toggleFavoriteSuccess, (state, { track }) => ({
        ...state,
        tracks: state.tracks.map(t => t.id === track.id ? track : t)
    })),
    on(TrackActions.toggleFavoriteFailure, (state, { error }) => ({
        ...state,
        error
    }))
);
