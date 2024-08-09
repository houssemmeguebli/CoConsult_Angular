import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-front',
  templateUrl: './profile-front.component.html',
  styleUrls: ['./profile-front.component.css']
})
export class ProfileFrontComponent {
  user: User | null = null; // Initialisez la propriété 'user' à null
  currentUser$!: Observable<User>; // Ajoutez un point d'exclamation (!) pour indiquer que currentUser$ sera initialisé dans ngOnInit

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser$ = this.userService.getCurrentUser();

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
        this.showErrorAlert();
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

  showErrorAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error loading user',
      text: 'An error occurred while loading user details. Please try again later.',
    });
  }
}



