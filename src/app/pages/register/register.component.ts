import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../_services/authentication/authentication.service";
import { RegisterRequest } from "src/app/_models/register-request";
import { User } from 'src/app/_models/user';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  displayRoleSelection: boolean = false;


  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {}

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    gender: ['', [Validators.required]],
    departmentName: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    profilePicture: ['', [Validators.required]],
    role: [[]]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    let formData = this.registerForm.value;
    formData.role = Array.isArray(formData.role) ? formData.role : [formData.role];

    this.authService.register(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie , Check Your Email',
          text: 'Vous pouvez maintenant vous connecter',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/front/login']);
      },
      error: (error: any) => {
        let errorMessage = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';

        if (error.status === 409) {
          errorMessage = 'L\'utilisateur avec cet email existe déjà.';
        } else if (error.status === 400 && error.error && error.error.message) {
          if (error.error.message === 'Bad credentials') {
            errorMessage = 'Nom d\'utilisateur ou email incorrect.';
          } else {
            errorMessage = error.error.message;
          }
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
          footer: 'Veuillez réessayer'
        });
      }
    });
  }

  selectedFile: File | null = null;

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
