import { Component } from '@angular/core';
import { marked } from 'marked';
import { ChatbotService, Conversation } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  showChatWindow: boolean = false;
  message: string = "";
  conversation: Conversation[] = []; // Array to hold conversation history
  loading:boolean=false
  initMessage = "Welcome 👐! Looking for a great read? Enter an author's name or book title to get awesome recommendations and engaging summaries!"

  constructor(private chatBotService: ChatbotService) { }

  chat(){
   this.initMessage=""
    if (this.message.trim() !== '') {
      // Add user message to conversation array
      this.conversation.push({ userMessage: this.message, gptResponse: '' });

      let body = { message: this.message };

      try {
        this.loading=true
        this.chatBotService.chat(body).subscribe((data) => {
          console.log(data);
          let htmlResponse = marked(data)
          this.conversation[this.conversation.length-1].gptResponse = htmlResponse
           this.loading=false
        })

      } catch (error) {
        console.error(error);
      }

      this.message = '';
    }
  }

  toggleChatWindow(): void {
    this.showChatWindow = !this.showChatWindow;
  }
}
