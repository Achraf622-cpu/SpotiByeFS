/**
 * Track State Selectors
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from './track.reducer';

export const selectTrackState = createFeatureSelector<TrackState>('tracks');

export const selectAllTracks = createSelector(
    selectTrackState,
    (state) => state.tracks
);

export const selectTracksLoading = createSelector(
    selectTrackState,
    (state) => state.loading
);

export const selectTracksError = createSelector(
    selectTrackState,
    (state) => state.error
);

export const selectTrackById = (id: string) => createSelector(
    selectAllTracks,
    (tracks) => tracks.find(track => track.id === id)
);

export const selectFavoriteTracks = createSelector(
    selectAllTracks,
    (tracks) => tracks.filter(track => track.isFavorite)
);

export const selectTracksByCategory = (category: string) => createSelector(
    selectAllTracks,
    (tracks) => tracks.filter(track => track.category === category)
);

export const selectTrackCount = createSelector(
    selectAllTracks,
    (tracks) => tracks.length
);

export const selectFavoriteCount = createSelector(
    selectFavoriteTracks,
    (favorites) => favorites.length
);
