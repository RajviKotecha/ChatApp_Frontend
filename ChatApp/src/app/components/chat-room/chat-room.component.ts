import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  tempRoomName: string = 'TempRoom';
  errorMessage: string = '';
  roomName: string = '';
  name: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.name.trim() !== '' && this.roomName.trim() !== '') {
      if (this.tempRoomName === this.roomName) {
        this.router.navigate(['chatinput']);
      } else {
        this.errorMessage = "Room name doesn't matched";
      }
    } else {
      this.errorMessage = 'Name and Room name are required fields';
    }
  }
}
