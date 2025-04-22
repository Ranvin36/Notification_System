import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationLayoutComponent } from './notification-layout/notification-layout.component';
import {MatIconModule} from '@angular/material/icon';
import { WebSocketMessage } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { WebSocketServiceService } from './web-socket-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NotificationLayoutComponent,MatIconModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private socketService:WebSocketServiceService;
  title = 'Notification_Sytem';
  notificationMessage:string = "";
  messages:any[] = [];

  constructor(private webSocketService:WebSocketServiceService){
    this.socketService = webSocketService
  }

  sendNotification(){
    this.socketService.send({type:"sendNotification",message:this.notificationMessage});
  }

  onNotificationMessage(event:any){
    this.notificationMessage = event.target.value
  }

  ngOnInit() {
    this.webSocketService.getMessages()?.subscribe(
        (message: any) => {
          if(message.type === "getMessages"){
            this.messages = message.message
          }
          if(message.type === "sendNotification"){
            this.messages.push(message)
          }
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
