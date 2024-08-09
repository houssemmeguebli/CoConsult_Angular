import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultantService } from '../_services/consultant.service';
import { FilterPipe } from '../_ActivityManagement/app-filter.pipe';
import { Consultant, Etat } from '../_models/Consultant';

@Component({
  selector: 'app-list-consultant',
  templateUrl: './list-consultant.component.html',
  styleUrls: ['./list-consultant.component.css']
})
export class ListConsultantComponent {
  listConsult: Consultant[] = [];
  searchText: string = '';
  constructor(private consultService: ConsultantService, private datePipe: DatePipe, private router: Router) { }
  consult!:string;

  ngOnInit(): void {
    this.fetchConsults();
  }

  fetchConsults() {
    this.consultService.getAllConsultants().subscribe({
      next: (data) => {
        this.listConsult = data;


      },
      error: (error) => console.log(error),
      complete: () => console.log('done')
    });
  }

  deleteConsult(idConsult: number): void {
    this.consultService.deleteConsult(idConsult).subscribe({
      next: () => {
        console.log('consultant deleted successfully!');
        this.fetchConsults();
      },
      error: (err: any) => {
        console.error('Error deleting consultant:', err);
      }
    });
  }
  viewConsultDetails(idConsult: number): void{
    console.log('Consult ID:', idConsult);
    this.router.navigate(['/getConsultById', idConsult]);
  }


}
