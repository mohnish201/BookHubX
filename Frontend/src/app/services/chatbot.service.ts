import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }

  chat(body: any): Observable<any> {
    return this.http.post<any>(`http://localhost:4800/chatbot`, body)
  }
}


export interface Conversation{
  userMessage:String,
  gptResponse:any
}