/**
 * Player State Selectors
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.reducer';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectCurrentTrack = createSelector(
    selectPlayerState,
    (state) => state.currentTrack
);

export const selectIsPlaying = createSelector(
    selectPlayerState,
    (state) => state.isPlaying
);

export const selectQueue = createSelector(
    selectPlayerState,
    (state) => state.queue
);

export const selectCurrentIndex = createSelector(
    selectPlayerState,
    (state) => state.currentIndex
);

export const selectVolume = createSelector(
    selectPlayerState,
    (state) => state.volume
);

export const selectCurrentTime = createSelector(
    selectPlayerState,
    (state) => state.currentTime
);

export const selectDuration = createSelector(
    selectPlayerState,
    (state) => state.duration
);

export const selectShuffle = createSelector(
    selectPlayerState,
    (state) => state.shuffle
);

export const selectRepeat = createSelector(
    selectPlayerState,
    (state) => state.repeat
);

export const selectProgress = createSelector(
    selectCurrentTime,
    selectDuration,
    (currentTime, duration) => duration > 0 ? (currentTime / duration) * 100 : 0
);
