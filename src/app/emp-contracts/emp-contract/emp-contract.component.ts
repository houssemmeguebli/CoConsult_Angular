import { Component, OnInit, Type } from '@angular/core';
import { EmpContractService } from '../../_services/emp-contract.service';
import { EmpContract } from '../../_models/emp-contract';
import { PdfGeneratorService } from 'src/app/_services/pdf-generator.service';
import { SignatureInputComponent } from '../signature-input/signature-input.component';
@Component({
  selector: 'app-emp-contract',
  templateUrl: './emp-contract.component.html',
  styleUrls: ['./emp-contract.component.css']
})
export class EmpContractComponent implements OnInit {
  empcontract: EmpContract[] = [];
  signature: ArrayBuffer | null = null; // Property to store the signature
  Nbcontract:number =0;
  filteredEmpContracts: EmpContract[] = [];
  searchTerm: string = '';
  
  constructor(private empContractService: EmpContractService, private pdfGeneratorService: PdfGeneratorService) { }

  ngOnInit(): void {
    this.loadEmpContracts();
  }

  supp(id: number) {
    this.empContractService.deleteEmpContract(id).subscribe(() => this.ngOnInit())
  }
 // Function to apply search filter



  
  loadEmpContracts(): void {
    this.empContractService.getEmpContracts().subscribe(empcontracts => {
      this.empcontract = empcontracts; 
      this.Nbcontract = this.empcontract.length; // Calculate the number of contracts
      ;// Assign received data to empcontract
    });
  }

  generatePDF(idContEmp: number) {
    console.log('Signature:', this.signature); // Check the value of signature
    if (this.signature === null) {
      console.error('Signature is null');
      return;
    }

    this.empContractService.getEmpContractById(idContEmp)
      .subscribe(
        (contract: EmpContract) => {
          this.pdfGeneratorService.generateContractPDF(contract, this.signature)
            .then(pdfBytes => {
              const blob = new Blob([pdfBytes], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(blob);
              window.open(url);
            })
            .catch(error => {
              console.error('Error generating PDF:', error);
            });
        },
        error => {
          console.error('Error fetching contract details:', error);
        }
      );
  }
  

  captureSignature(signatureDataUrl: string) {
    // Convert the signature data URL to an ArrayBuffer
    const signatureDataArrayBuffer = this.dataURLToArrayBuffer(signatureDataUrl);
    
    // Check if signatureDataArrayBuffer is not null or undefined
    if (signatureDataArrayBuffer) {
      // Assign the signature data ArrayBuffer to the signature variable
      this.signature = signatureDataArrayBuffer;
    } else {
      console.error('Error converting signature data URL to ArrayBuffer');
    }
  }
  
  // Helper function to convert data URL to ArrayBuffer
  dataURLToArrayBuffer(dataURL: string): ArrayBuffer | null {
    const byteString = atob(dataURL.split(',')[1]);
    const byteStringLength = byteString.length;
    const arrayBuffer = new ArrayBuffer(byteStringLength);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteStringLength; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return arrayBuffer;
  }
  
}
