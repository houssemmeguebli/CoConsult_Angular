import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicesService } from '../../_services/invoices.service';
import { EmailService } from '../../_services/email.service';

@Component({
  selector: 'app-add-invoices',
  templateUrl: './add-invoices.component.html',
  styleUrls: ['./add-invoices.component.css']
})
export class AddInvoicesComponent {
  addInvoiceForm: FormGroup;
  idContrat: number | null = null;

  constructor(
    private fb: FormBuilder,
    private invoicesService: InvoicesService,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const idContratParam = this.route.snapshot.paramMap.get('idContrat');
    if (idContratParam) {
      this.idContrat = +idContratParam;
    }

    this.addInvoiceForm = this.fb.group({
      dateInvoice: ['', [Validators.required, this.validateDate]],
      amount: ['', Validators.required],
      nameDestinaire: ['', Validators.required],
      emailDestinaire: ['', [Validators.required, Validators.email]],
      idContrat: [this.idContrat ?? null]
    });
  }

  validateDate(control: any) {
    const today = new Date();
    const inputDate = new Date(control.value);
    return inputDate > today ? null : { invalidDate: true };
  }

  addInvoice() {
    if (this.addInvoiceForm.valid) {
      this.invoicesService.createInvoice(this.addInvoiceForm.value).subscribe(
        createdInvoice => {
          console.log('Invoice added successfully:', createdInvoice);
          this.sendEmail(this.addInvoiceForm.value);
          this.addInvoiceForm.reset();
          if (this.idContrat !== null) {
            this.router.navigate(['/back/invoices', this.idContrat]);
          } else {
            this.router.navigate(['/back/invoices']);
          }
        },
        error => {
          console.error('Error adding invoice:', error);
        }
      );
    } else {
      console.error('Invalid form data');
    }
  }

  sendEmail(invoiceData: any) {
    this.emailService.sendEmail(invoiceData).subscribe(
      response => {
        console.log('Email sent successfully:', response);
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
  }
}
