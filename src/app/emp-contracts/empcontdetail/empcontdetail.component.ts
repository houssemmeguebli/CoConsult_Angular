import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpContract } from 'src/app/_models/emp-contract';
import { EmpContractService } from 'src/app/_services/emp-contract.service';
import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-empcontdetail',
  templateUrl: './empcontdetail.component.html',
  styleUrls: ['./empcontdetail.component.css']
})
export class EmpcontdetailComponent {
  @ViewChild('contractDetails') contractDetails!: ElementRef;

 

 
  idEmpCont!:number
  ec!:EmpContract
  
    constructor(private Act:ActivatedRoute, private empcontractservice:EmpContractService) {
      
    }
  
    ngOnInit(){
      this.idEmpCont=this.Act.snapshot.params['id']
      this.empcontractservice.getEmpContractById(this.idEmpCont).subscribe((data)=>this.ec=data)
      
  
    }
    generatePdf() {
      const doc = new jspdf();
      const contractDetails = this.contractDetails.nativeElement;
  
      html2canvas(contractDetails).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 size width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
  
        doc.addImage(imgData, 0, 0, imgWidth, imgHeight);
        doc.save('contract-details.pdf');
      });
    }
}
