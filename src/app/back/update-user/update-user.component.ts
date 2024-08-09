import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userForm!: FormGroup;
  message: string = '';
  loading = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute,  private router: Router) { }
  

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      role: [[], Validators.required], // Initialisez le rôle comme un tableau vide
      gender: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      profilePicture: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;

      const userData = this.userForm.value;
      const id = this.route.snapshot.params['id'];

      this.http.put<any>(`http://localhost:8081/api/v1/admin/updateUser/${id}`, userData).subscribe(
        response => {
          this.message = response.message;
          this.userForm.reset();
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.message
          });
          this.router.navigate(['/back/user']);

        },
        error => {
          console.error('Error updating user:', error);
          this.message = 'An error occurred while updating the user.';
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while updating the user.'
          });
        }
      );
    }
  }

}
