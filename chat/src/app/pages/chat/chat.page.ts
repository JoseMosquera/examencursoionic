import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Message } from '../../models/message.model';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import { IonContent } from '@ionic/angular';

const subject = webSocket(environment.webSocket);

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent

  name: string
  messageForm: FormGroup
  state: string = ''
  messages: Message[] = []

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.state = 'loading'
    this.name = this.chatService.user.name
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    })
    this.chatService.getMessages().subscribe(messgs => {
      this.messages = messgs
      setTimeout(() => {
        this.content.scrollToBottom()
      }, 250);
      this.state = 'loaded'
    },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.state = 'error'
      }
    )

    subject.subscribe(
      msg => {
        console.log('message received: ' + msg)
        this.messages = this.messages.concat(msg as Message)
        setTimeout(() => {
          this.content.scrollToBottom()
        }, 250);
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }



  sendMessage() {
    if (this.messageForm.valid) {
      this.chatService.sendMessage(this.messageForm.value).subscribe()
      this.messageForm.reset()
    }
  }

  loadAgain() {
    this.chatService.getMessages().subscribe(messgs => {
      this.messages = messgs
    })
  }
}
