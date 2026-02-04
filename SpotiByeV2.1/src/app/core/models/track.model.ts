
export type MusicCategory = 'pop' | 'rock' | 'rap' | 'jazz' | 'classical' | 'electronic' | 'rnb' | 'country' | 'other';

/**
 * All available music categories
 */
export const MUSIC_CATEGORIES: MusicCategory[] = [
  'pop', 'rock', 'rap', 'jazz', 'classical', 'electronic', 'rnb', 'country', 'other'
];

export type PlayerState = 'playing' | 'paused' | 'buffering' | 'stopped';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export const SUPPORTED_AUDIO_FORMATS = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const VALIDATION = {
  TITLE_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 200,
} as const;

export interface Track {
  id: number | string; // Backend sends number (Long)

  title: string;

  artist: string;

  description?: string;

  category: MusicCategory;

  duration: number;

  dateAdded: Date | string; // Backend sends string (ISO date)

  audioFileId?: string; // Optional (not used by backend DTO)

  audioUrl?: string;

  coverImage?: string;

  isFavorite: boolean;
}

/**
 * Data required to create a new track
 */
export interface CreateTrackDto {
  title: string;
  artist: string;
  description?: string;
  category: MusicCategory;
  audioFile: File;
  coverImage?: string;
}

export interface UpdateTrackDto {
  title?: string;
  artist?: string;
  description?: string;
  category?: MusicCategory;
  coverImage?: string;
  isFavorite?: boolean;
}

export interface AudioFile {
  id: string;
  blob: Blob;
  mimeType: string;
  size: number;
}


