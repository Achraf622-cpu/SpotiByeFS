/**
 * @fileoverview App Root Component - Responsive application shell
 * @see SPOT-26 Responsive Design Implementation
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerBarComponent } from './shared/components/player-bar/player-bar.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerBarComponent, NotificationsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
