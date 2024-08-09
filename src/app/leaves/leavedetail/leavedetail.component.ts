import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from 'src/app/_services/leave.service';
import { EtatLeave, Leave, TypeLeave } from 'src/app/_models/leave';
import { MailLeaveService } from 'src/app/_services/mail-leave.service';
@Component({
  selector: 'app-leavedetail',
  templateUrl: './leavedetail.component.html',
  styleUrls: ['./leavedetail.component.css']
})
export class LeavedetailComponent implements OnInit {
  leaveId!: number;
  leave!: Leave;
  userId: number = 0;
  etatLeaveOptions: string[] = []; // Déclaration de la propriété et initialisation avec un tableau vide
  leaveTypes: string[] = Object.values(TypeLeave).filter(value => typeof value === 'string') as string[];
  leaveForm!: FormGroup;
  showEdit: boolean = false;
  showErrorMessage: boolean = false; // Ajoutez cette ligne pour déclarer la propriété showErrorMessage
  startDateBeforeToday: boolean = false; // Add this property

  constructor(
    private route: ActivatedRoute,
    private leaveService: LeaveService,
    private emailService: MailLeaveService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      userId: [''],
      typeLeave: ['', Validators.required],
      etat: ['', Validators.required], // Ajouter le contrôle pour 'etat'
      startDateLeave: ['', Validators.required],
      endDateLeave: ['', Validators.required],
    }, {
      validators: this.endDateAfterStartDateValidator('startDateLeave', 'endDateLeave')
    });
    

    // Initialize etatLeaveOptions
    this.etatLeaveOptions = Object.values(EtatLeave).filter(value => typeof value === 'string') as string[];

    this.route.params.subscribe(params => {
      this.leaveId = +params['leaveId'];
      this.loadLeave(this.leaveId);
    });
  }

  showEditForm(): void {
    this.showEdit = true;
  }

  saveLeave(): void {
    const today = new Date().toISOString().split('T')[0];
    const startDate = this.leaveForm.value.startDateLeave;
  
    // Check if the start date is before today
    if (startDate < today) {
      console.error('Cannot save leave with start date before today.');
      this.startDateBeforeToday = true; // Set flag to true
      return; // Cancel the save
    } else {
      this.startDateBeforeToday = false; // Reset flag if start date is valid
    }
  
    if (this.leaveForm.valid) {
      const leaveId = this.leaveId;
      const newLeave = this.leaveForm.value;
      this.leaveService.updateLeave(leaveId, newLeave, this.userId).subscribe(
        updatedLeave => {
          console.log('Leave updated successfully:', updatedLeave);
          this.leaveService.deleteLeave(leaveId).subscribe();
          const formData = new FormData();
      formData.append('to', 'coconsulttest@gmail.com');
      formData.append('cc', 'coconsulttest@gmail.com');
      formData.append('subject', 'Etat du congé');
      formData.append('body', 'Votre état de Congé a été modifier, veuillez le vérifier ');
  
      // Ajoutez les pièces jointes
      //formData.append('file', file);
  
      this.emailService.sendMail(formData);
          this.router.navigate(['/back/leaves']);
        },
        error => {
          console.error('Error updating leave:', error);
        }
      );

    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.leaveForm);
    }
  }
  
  
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  loadLeave(leaveId: number): void {
    if (!isNaN(leaveId)) {
      this.leaveService.getLeaveById(leaveId).subscribe(
        leave => {
          const startDate = new Date(leave.startDateLeave).toISOString().split('T')[0];
          const endDate = new Date(leave.endDateLeave).toISOString().split('T')[0];
          
          this.leave = leave;
          // Patch form values with leave details
          this.leaveForm.patchValue({
            userId: leave.user ? leave.user.id : null,
            typeLeave: leave.typeLeave,
            startDateLeave: startDate,
            endDateLeave: endDate,
          });
        },
        error => {
          console.error('An error occurred while fetching leave details:', error);
        }
      );
    } else {
      console.error('Invalid leave ID:', leaveId);
    }
  }
  

  // Validator function
  endDateAfterStartDateValidator(startDateKey: string, endDateKey: string) {
    return (group: FormGroup) => {
      const startDate = group.controls[startDateKey];
      const endDate = group.controls[endDateKey];
      if (startDate.value && endDate.value && endDate.value < startDate.value) {
        return { endDateBeforeStartDate: true };
      }
      return null;
    };
  }
}