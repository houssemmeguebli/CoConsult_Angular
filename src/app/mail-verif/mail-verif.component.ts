import { Component } from '@angular/core';
import { VerificationService } from '../_services/verification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-mail-verif',
  templateUrl: './mail-verif.component.html',
  styleUrls: ['./mail-verif.component.css']
})
export class MailVerifComponent {
  email: string = '';
  verificationCode: string = '';
  verificationCodeSent: boolean = false;
  verificationCodeValid: boolean = false;

  constructor(private verificationService: VerificationService) {}

  submitEmail(f:NgForm) {
    console.log('Email submitted:', this.email);
    this.verificationService.sendVerificationCode(this.email).subscribe(
      (response) => {
        console.log('Verification code sent successfully:', response);
        if (response instanceof HttpErrorResponse) {
          console.error('Failed to send verification code:', response.error);
        } else {
          this.verificationCodeSent = true;
        }
      },
      (error) => {
        console.error('Failed to send verification code:', error);
      }
    );
  }


  verifyCode() {
    console.log('Verification code submitted:', this.verificationCode);
    this.verificationService.verifyCode(this.email, this.verificationCode).subscribe(
      (response: any) => {
        console.log('Verification code verified:', response);
        this.verificationCodeValid = false;
      },
      (error: any) => {
        console.error('Failed to verify verification code:', error);
      }
    );
  }

}
