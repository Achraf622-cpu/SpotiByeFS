/**
 * Player State Actions
 */
import { createAction, props } from '@ngrx/store';
import { Track } from '../../core/models/track.model';

export const play = createAction('[Player] Play');
export const pause = createAction('[Player] Pause');
export const togglePlay = createAction('[Player] Toggle Play');

export const setTrack = createAction(
    '[Player] Set Track',
    props<{ track: Track }>()
);

export const setQueue = createAction(
    '[Player] Set Queue',
    props<{ queue: Track[]; currentIndex: number }>()
);

export const nextTrack = createAction('[Player] Next Track');
export const previousTrack = createAction('[Player] Previous Track');

export const setVolume = createAction(
    '[Player] Set Volume',
    props<{ volume: number }>()
);

export const setCurrentTime = createAction(
    '[Player] Set Current Time',
    props<{ currentTime: number }>()
);

export const setDuration = createAction(
    '[Player] Set Duration',
    props<{ duration: number }>()
);

export const toggleShuffle = createAction('[Player] Toggle Shuffle');
export const toggleRepeat = createAction('[Player] Toggle Repeat');
