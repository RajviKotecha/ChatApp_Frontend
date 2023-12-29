import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public messageReceived = new Subject<string>();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7296/chathub')
      .build();
  }

  startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.registerEvents();
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  registerEvents() {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messageReceived.next(message);
    });
  }

  sendMessage(message: string) {
    this.hubConnection.invoke('SendMessage', message);
  }
}
