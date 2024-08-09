import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez les modules nécessaires pour les formulaires réactifs
import {ActivatedRoute, Router, Routes} from "@angular/router";
import { UserService } from 'src/app/_services/user/user.service';
import { HttpClient } from '@angular/common/http'; // Importez le module HttpClient
import Swal from "sweetalert2";
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  message: string = ''; // Variable pour stocker le message de réponse du backend
  loading = false; // Initialize loading variable



  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {}
  userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  gender: ['', [Validators.required]], 
  departmentName: ['', [Validators.required]], 
  dateOfBirth: ['', [Validators.required]], 
  profilePicture:['', [Validators.required]],  
  role: [[]]
  });

  ngOnInit(): void {  }

  

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    
    let formData = this.userForm.value;
  
    formData.role = Array.isArray(formData.role) ? formData.role : [formData.role];
  

    this.authService.register(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'ajout réussie',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/back/user']);
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de l\'ajout',
          footer: 'Veuillez réessayer'
        });
      }
    });
  }
  
}
