/**
 * Track State Actions
 */
import { createAction, props } from '@ngrx/store';
import { Track } from '../../core/models/track.model';

// Load Tracks
export const loadTracks = createAction('[Track] Load Tracks');
export const loadTracksSuccess = createAction(
    '[Track] Load Tracks Success',
    props<{ tracks: Track[] }>()
);
export const loadTracksFailure = createAction(
    '[Track] Load Tracks Failure',
    props<{ error: string }>()
);

// Add Track
export const addTrack = createAction(
    '[Track] Add Track',
    props<{ track: Track }>()
);
export const addTrackSuccess = createAction(
    '[Track] Add Track Success',
    props<{ track: Track }>()
);
export const addTrackFailure = createAction(
    '[Track] Add Track Failure',
    props<{ error: string }>()
);

// Update Track
export const updateTrack = createAction(
    '[Track] Update Track',
    props<{ track: Track }>()
);
export const updateTrackSuccess = createAction(
    '[Track] Update Track Success',
    props<{ track: Track }>()
);
export const updateTrackFailure = createAction(
    '[Track] Update Track Failure',
    props<{ error: string }>()
);

// Delete Track
export const deleteTrack = createAction(
    '[Track] Delete Track',
    props<{ id: string }>()
);
export const deleteTrackSuccess = createAction(
    '[Track] Delete Track Success',
    props<{ id: string }>()
);
export const deleteTrackFailure = createAction(
    '[Track] Delete Track Failure',
    props<{ error: string }>()
);

// Toggle Favorite
export const toggleFavorite = createAction(
    '[Track] Toggle Favorite',
    props<{ id: string }>()
);
export const toggleFavoriteSuccess = createAction(
    '[Track] Toggle Favorite Success',
    props<{ track: Track }>()
);
export const toggleFavoriteFailure = createAction(
    '[Track] Toggle Favorite Failure',
    props<{ error: string }>()
);
