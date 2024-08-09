import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/_models/chat';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements OnInit{
  public alluser: any = [];
  check = sessionStorage.getItem('username');
  chatId: any = 0;
  chatObj: Chat = new Chat();
  public chatData: any = [];

  constructor(private router: Router, private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    let all = setInterval(() => {

      this.userService.getAll().subscribe((data: any) => {
        // console.log(data);
        this.alluser = data;
      })
    }, 1000);
  }


  goToChat(username: any) {
    const usernameFromSessionStorage = sessionStorage.getItem("username");
    if (usernameFromSessionStorage !== null) {
      this.chatService.getChatByFirstUserNameAndSecondUserName(username, usernameFromSessionStorage).subscribe(

        (data) => {
          this.chatId = data.chatId;
          sessionStorage.setItem("chatId", this.chatId);
  
          sessionStorage.setItem("gotochat", "false");
          this.router.navigateByUrl('/chat');
        },
    
         
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = usernameFromSessionStorage;
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data: any) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem("chatId", this.chatData.chatId);

              sessionStorage.setItem("gotochat", "false");
              this.router.navigateByUrl('/chat');
            })
        } else {

        }
      });

  }


  }

}
