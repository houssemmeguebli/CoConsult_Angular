import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/_models/chat';
import { User } from 'src/app/_models/user';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { UserService } from 'src/app/_services/user/user.service';
@Component({
  selector: 'app-u',
  templateUrl: './u.component.html',
  styleUrls: ['./u.component.css']
})
export class UComponent implements OnInit {
  chatId: any = 0;
  registerForm: FormGroup;
  loginForm: FormGroup;
  successregister: boolean = false;
  registermsg = "";
  alert = "";
  loginmsg = "";
  alert2 = "";
  successlogin: boolean = false;
  public userObj: User = new User();
  public alluser: any = [];
  secondUsername = "";
  chatObj: Chat = new Chat();
  public chatData: any = [];
  check = "";
  loggedIn: boolean = false;
  loggedOut: boolean = true;
  chatbox: boolean = true;

  logout() {
    this.loggedIn = false;
    this.loggedOut = true;
    sessionStorage.clear();
    
    this.router.navigateByUrl('');
  }

  constructor(private router: Router, private userService: UserService, private chatService: ChatService) {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required])
    });
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {

    setInterval(() => {
      this.userService.getAll().subscribe((data) => {
        // console.log(data);

        this.alluser = data;

      })
    }, 1000);

  }

  adduser() {
    if (this.registerForm.valid) {
      this.userObj.username = this.registerForm.value.username;
      this.userService.adduser(this.userObj).subscribe(
        (data: any) => {
          console.log(data);

          this.successregister = true;
          this.alert = "success";
          this.registermsg = "Successsfully added";

          this.registerForm.reset();

        },
        (error) => {
          console.log(error.error);
          if (error.status == 409) {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Already registered"
          } else {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Error"
          }

        }
      )
    }

  }

  login() {
    if (this.loginForm.valid) {
      this.userService.getUserByUsername(this.loginForm.value.username).subscribe(
        (data: any) => {
          console.log(data);

          this.successlogin = true;
          this.alert2 = "success";
          this.loginmsg = "Successsfully LoggedIn";

          sessionStorage.setItem("username", this.loginForm.value.username);
          this.check = this.loginForm.value.username;
          this.loginForm.reset();

          this.loggedIn = true;
          this.loggedOut = false;

          // this.router.navigateByUrl('/chat');
        },
        (error) => {
          console.log(error.error);
          if (error.status == 404) {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Not a registerd user"
          } else {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Error"
          }

        }
      )
    }


  }

  goToChat(username: any) {
    const usernameFromSessionStorage = sessionStorage.getItem("username");
    if (usernameFromSessionStorage !== null) {
      this.chatService.getChatByFirstUserNameAndSecondUserName(username, usernameFromSessionStorage).subscribe(
      (data) => {
        this.chatData = data;
        this.chatId = this.chatData[0].chatId;
        sessionStorage.setItem("chatId", this.chatId);
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = usernameFromSessionStorage;
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              sessionStorage.setItem("chatId", this.chatData[0].chatId);
              // this.router.navigateByUrl('/chat');
              console.log("2")
            })
        } else {
          // this.router.navigateByUrl('/chat');
          console.log("3")
        }
      });

  }

}
}

