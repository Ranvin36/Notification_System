import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-layout',
  standalone: true,
  imports: [],
  templateUrl: './notification-layout.component.html',
  styleUrl: './notification-layout.component.css'
})
export class NotificationLayoutComponent {
  @Input() title!:string;
}
