import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { User } from 'src/app/_models/user';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // Initialisez la propriété 'user' à null
  currentUser$!: Observable<User>; // Ajoutez un point d'exclamation (!) pour indiquer que currentUser$ sera initialisé dans ngOnInit
  username!: string;
  useremail!:string;
  userrole!:string;

  constructor(private userService: UserService,private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUser$ = this.userService.getCurrentUser();
    this.username=this.authService.logDecodedTokenName();
    this.useremail=this.authService.logDecodedTokenmail();
    this.userrole=this.authService.logDecodedToken();

    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      (user: User) => {
        this.user = user;
        this.showSuccessAlert();
      },
      (error: any) => {
        console.error('Error loading current user:', error);
       // this.showErrorAlert();
      }
    );
  }

  showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'User loaded successfully',
      text: 'User details loaded successfully!',
    });
  }
  /*
  showErrorAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error loading user',
      text: 'An error occurred while loading user details. Please try again later.',
    });
  }
  */
}
