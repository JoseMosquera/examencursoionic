import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message.model';
import { webSocket } from "rxjs/webSocket";
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

const subject = webSocket(environment.webSocket);

@Injectable({
  providedIn: 'root'
})
export class ChatService implements CanActivate{

  user: User

  constructor(
    private http: HttpClient,
    private router: Router
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

  canActivate() {
    if (this.user) {
      return true
    } else {
      this.router.navigateByUrl('/login')
      return false
    }
  }
}
