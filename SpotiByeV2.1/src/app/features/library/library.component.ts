/**
 * @fileoverview Library Component - Main music library view
 * @see SPOT-22 Implement Library Component
 */
import { Component, inject, signal, computed } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { Track, MUSIC_CATEGORIES } from '../../core/models/track.model';
import { TrackCardComponent } from './components/track-card.component';
import { UploadModalComponent } from './components/upload-modal.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [TitleCasePipe, TrackCardComponent, UploadModalComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  trackService = inject(TrackService);
  playerService = inject(AudioPlayerService);

  categories = MUSIC_CATEGORIES;
  searchQuery = signal('');
  selectedCategory = signal<string>('all');
  showUploadModal = signal(false);

  filteredTracks = computed(() => {
    let tracks = this.trackService.tracks();

    // Filter by favorites
    const category = this.selectedCategory();
    if (category === 'favorites') {
      tracks = tracks.filter(t => t.isFavorite);
    } else if (category && category !== 'all') {
      tracks = tracks.filter(t => t.category === category);
    }

    // Apply search filter
    const query = this.searchQuery().toLowerCase();
    if (query) {
      tracks = tracks.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.artist.toLowerCase().includes(query)
      );
    }

    return tracks;
  });

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value);
  }

  async onPlayTrack(track: Track): Promise<void> {
    if (this.playerService.currentTrack()?.id === track.id) {
      await this.playerService.togglePlay();
    } else {
      const tracks = this.filteredTracks();
      const index = tracks.findIndex(t => t.id === track.id);
      this.playerService.setQueue(tracks, index);
    }
  }

  onViewDetails(track: Track): void {
    // Navigate to track details (handled by router link in card)
  }

  async onToggleFavorite(track: Track): Promise<void> {
    await this.trackService.toggleFavorite(track.id);
  }

  playAll(): void {
    const tracks = this.filteredTracks();
    if (tracks.length > 0) {
      this.playerService.setQueue(tracks, 0);
    }
  }

  onTrackAdded(): void {
    this.showUploadModal.set(false);
  }
}
