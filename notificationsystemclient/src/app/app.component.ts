import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationLayoutComponent } from './notification-layout/notification-layout.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NotificationLayoutComponent,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Notification_Sytem';
}
