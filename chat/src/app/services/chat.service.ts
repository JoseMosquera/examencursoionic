import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message.model';
import { webSocket } from "rxjs/webSocket";
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const subject = webSocket(environment.webSocket);

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: User

  constructor(
    private http: HttpClient
  ) { }

  setName(user: User) {
    this.user = user
  }

  sendMessage(message): Observable<any> {
    let mesg = {user: this.user.name, text: message.message}
    return this.http.post(`${environment.apiUrl}/messages/`, mesg) as Observable<any>
  }

  getMessages(): Observable<Message[]> {
    return this.http.get(`${environment.apiUrl}/messages`) as Observable<Message[]>
  }
}
