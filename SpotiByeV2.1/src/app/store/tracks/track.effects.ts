/**
 * Track State Effects
 */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { Track } from '../../core/models/track.model';
import { TrackService } from '../../core/services/track.service';
import * as TrackActions from './track.actions';

@Injectable()
export class TrackEffects {
    private actions$ = inject(Actions);
    private trackService = inject(TrackService);

    loadTracks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.loadTracks),
            switchMap(() =>
                this.trackService.getAllTracks().then((tracks: Track[]) =>
                    TrackActions.loadTracksSuccess({ tracks })
                ).catch((error: Error) =>
                    TrackActions.loadTracksFailure({ error: error.message })
                )
            )
        )
    );

    addTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.addTrack),
            switchMap(({ track }) =>
                this.trackService.addTrack(track).then(() =>
                    TrackActions.addTrackSuccess({ track })
                ).catch((error: Error) =>
                    TrackActions.addTrackFailure({ error: error.message })
                )
            )
        )
    );

    updateTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.updateTrack),
            switchMap(({ track }) =>
                this.trackService.updateTrack(track).then(() =>
                    TrackActions.updateTrackSuccess({ track })
                ).catch((error: Error) =>
                    TrackActions.updateTrackFailure({ error: error.message })
                )
            )
        )
    );

    deleteTrack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.deleteTrack),
            switchMap(({ id }) =>
                this.trackService.deleteTrack(id).then(() =>
                    TrackActions.deleteTrackSuccess({ id })
                ).catch((error: Error) =>
                    TrackActions.deleteTrackFailure({ error: error.message })
                )
            )
        )
    );

    toggleFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TrackActions.toggleFavorite),
            switchMap(({ id }) =>
                this.trackService.toggleFavoriteWithReturn(id).then(track =>
                    TrackActions.toggleFavoriteSuccess({ track })
                ).catch((error: Error) =>
                    TrackActions.toggleFavoriteFailure({ error: error.message })
                )
            )
        )
    );
}
