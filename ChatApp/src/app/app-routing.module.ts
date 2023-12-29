import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomComponent,
  },

  {
    path: 'chatinput',
    component: ChatInputComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
