import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  private socket$: WebSocketSubject<any> | null = null;

  constructor() { 
    if(typeof window !== 'undefined'){
      this.socket$ = webSocket('ws://localhost:3000');
    }
  }

  send(messages:any){
    this.socket$?.next(messages);
  }

  getMessages(){
    return this.socket$;
  }
}
