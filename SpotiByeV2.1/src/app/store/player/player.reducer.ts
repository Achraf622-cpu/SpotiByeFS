/**
 * Player State Reducer
 */
import { createReducer, on } from '@ngrx/store';
import { Track } from '../../core/models/track.model';
import * as PlayerActions from './player.actions';

export interface PlayerState {
    currentTrack: Track | null;
    queue: Track[];
    currentIndex: number;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    shuffle: boolean;
    repeat: boolean;
}

export const initialState: PlayerState = {
    currentTrack: null,
    queue: [],
    currentIndex: 0,
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    shuffle: false,
    repeat: false
};

export const playerReducer = createReducer(
    initialState,

    on(PlayerActions.play, (state) => ({
        ...state,
        isPlaying: true
    })),

    on(PlayerActions.pause, (state) => ({
        ...state,
        isPlaying: false
    })),

    on(PlayerActions.togglePlay, (state) => ({
        ...state,
        isPlaying: !state.isPlaying
    })),

    on(PlayerActions.setTrack, (state, { track }) => ({
        ...state,
        currentTrack: track,
        isPlaying: true
    })),

    on(PlayerActions.setQueue, (state, { queue, currentIndex }) => ({
        ...state,
        queue,
        currentIndex,
        currentTrack: queue[currentIndex] || null,
        isPlaying: true
    })),

    on(PlayerActions.nextTrack, (state) => {
        const nextIndex = (state.currentIndex + 1) % state.queue.length;
        return {
            ...state,
            currentIndex: nextIndex,
            currentTrack: state.queue[nextIndex] || null,
            currentTime: 0
        };
    }),

    on(PlayerActions.previousTrack, (state) => {
        const prevIndex = state.currentIndex > 0
            ? state.currentIndex - 1
            : state.queue.length - 1;
        return {
            ...state,
            currentIndex: prevIndex,
            currentTrack: state.queue[prevIndex] || null,
            currentTime: 0
        };
    }),

    on(PlayerActions.setVolume, (state, { volume }) => ({
        ...state,
        volume
    })),

    on(PlayerActions.setCurrentTime, (state, { currentTime }) => ({
        ...state,
        currentTime
    })),

    on(PlayerActions.setDuration, (state, { duration }) => ({
        ...state,
        duration
    })),

    on(PlayerActions.toggleShuffle, (state) => ({
        ...state,
        shuffle: !state.shuffle
    })),

    on(PlayerActions.toggleRepeat, (state) => ({
        ...state,
        repeat: !state.repeat
    }))
);
