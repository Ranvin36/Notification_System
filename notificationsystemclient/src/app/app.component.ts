import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationLayoutComponent } from './notification-layout/notification-layout.component';
import {MatIconModule} from '@angular/material/icon';
import { WebSocketMessage } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { WebSocketServiceService } from './web-socket-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NotificationLayoutComponent,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private socketService:WebSocketServiceService;
  title = 'Notification_Sytem';
  notificationMessage:string = "";

  constructor(private webSocketService:WebSocketServiceService){
    this.socketService = webSocketService
  }

  sendNotification(){
    this.socketService.send({message:this.notificationMessage});
  }

  onNotificationMessage(event:any){
    this.notificationMessage = event.target.value
  }

  ngOnInit() {
    this.webSocketService.getMessages()?.subscribe(
        (message: any) => {
        console.log(message,"MESSAGE")
        },
        (error: any) => {
        console.error('WebSocket error:', error);
        },
        () => {
        console.log('WebSocket connection closed');
        }
    );
    }

}
