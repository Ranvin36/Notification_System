import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationLayoutComponent } from './notification-layout/notification-layout.component';
import {MatIconModule} from '@angular/material/icon';
import { WebSocketMessage } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { WebSocketServiceService } from './web-socket-service.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NotificationLayoutComponent,MatIconModule,CommonModule,FormsModule,AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private socketService:WebSocketServiceService;
  title = 'Notification_Sytem';
  notificationMessage:string = "";
  messages:any[] = [];
  alertMessage:string = "";
  alertAction:boolean = false;
  constructor(private webSocketService:WebSocketServiceService){
    this.socketService = webSocketService
  }

  sendNotification(){
    if(this.notificationMessage.length > 0){
      this.socketService.send({type:"sendNotification",message:this.notificationMessage});
      this.alertMessage = "Notification sent successfully"
      this.alertAction = true;
      setTimeout(() => {
        this.alertAction = false;
        this.notificationMessage = "";
      }, 3000);
    }
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
