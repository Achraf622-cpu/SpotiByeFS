import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TrackService } from './core/services/track.service';
import { AudioPlayerService } from './core/services/audio-player.service';
import { NotificationService } from './core/services/notification.service';
import { vi } from 'vitest';
import { signal } from '@angular/core';

describe('App', () => {
  beforeEach(async () => {
    const mockTrackService = {
      tracks: signal([]),
      loadingState: signal('idle'),
      error: signal(null)
    };
    const mockAudioPlayerService = {
      currentTrack: signal(null),
      playerState: signal('stopped'),
      volume: signal(1),
      progress: signal(0),
      duration: signal(0),
      isMuted: signal(false),
      queue: signal([]),
      queueIndex: signal(0),
      shuffle: signal(false),
      repeatMode: signal('off'),
      isPlaying: signal(false)
    };
    const mockNotificationService = {
      notifications: signal([]),
      remove: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: TrackService, useValue: mockTrackService },
        { provide: AudioPlayerService, useValue: mockAudioPlayerService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
