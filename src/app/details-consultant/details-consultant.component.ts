import { Component } from '@angular/core';
import { Consultant } from '../_models/Consultant';
import { ConsultantService } from '../_services/consultant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-consultant',
  templateUrl: './details-consultant.component.html',
  styleUrls: ['./details-consultant.component.css']
})
export class DetailsConsultantComponent {
  consult: Consultant = new Consultant();

  constructor(private consultService: ConsultantService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const consultId = Number(params.get('id'));
      this.consultService.getConsultById(consultId).subscribe(consult => {
        this.consult = consult;
      });
    });
  }
}
