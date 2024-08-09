import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user-service.service';
import { User } from 'src/app/_models/userCopy';
@Component({
  selector: 'app-performanceuser',
  templateUrl: './performanceuser.component.html',
  styleUrls: ['./performanceuser.component.css']
})
export class PerformanceuserComponent {
  users: User[] = [];
  user!:User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.findAllUsers().subscribe(users=>
      {this.users= users;
        
      });}
}
