import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  inputMessage: string = '';
  @Output() sendMessage = new EventEmitter<string>();

  messages: {
    text: string;
    isMyMessages: boolean;
  }[] = [
    {
      text: 'Hello from Fenil',
      isMyMessages: true,
    },
    {
      text: 'Hello from Test',
      isMyMessages: false,
    },
  ];

  constructor(
    private location: Location,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.messageReceived.subscribe((message: string) => {
      console.log('Received message:', message);
      this.messages.push({
        text: message,
        isMyMessages: false,
      });
      this.scrollToBottom();
    });
  }

  send() {
    if (this.inputMessage.trim() !== '') {
      this.signalRService.sendMessage(this.inputMessage);
      this.messages.push({
        text: this.inputMessage,
        isMyMessages: true,
      });
      this.inputMessage = '';
    }
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }, 0);
    } catch (err) {
      console.error(err);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
