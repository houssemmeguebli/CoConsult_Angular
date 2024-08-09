import { Injectable } from '@angular/core';
import { EmpContract } from '../_models/emp-contract';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  async generateContractPDF(contract: EmpContract, signature: ArrayBuffer | null): Promise<Uint8Array> {
    if (signature === null) {
      console.error('Signature is null');
      // Handle the case where signature is null, maybe return an empty PDF or throw an error
      return new Uint8Array(); // or throw new Error('Signature is null');
    }    
    // Load the logo image from assets directory
    const logoPath = '../../assets/front/images/coconsult.png'; // Replace with the path to your local image
    const logoImageBytes = await this.getImageAsArrayBuffer(logoPath);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page to the PDF document
    const page = pdfDoc.addPage();

    // Embed the logo image on the page
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const { width, height } = logoImage.scale(0.15); // Adjust logo size as needed
    page.drawImage(logoImage, {
      x: 10, // X coordinate
      y: 750, // Y coordinate
      width,
      height,
    });
    await this.drawSignature(pdfDoc, page, signature);

    const titleFontSize = 20;
    const titleY = page.getHeight() - height - 50 - titleFontSize;
    page.setFontSize(titleFontSize);
    page.drawText('Contrat de travail', {
      x: 200,
      y: 750,
      color: rgb(0, 0, 1), // Red color
    });

    const startDateFormatted = this.datePipe.transform(contract.startDate, 'dd/MM/yyyy');
    const endDateFormatted = this.datePipe.transform(contract.endDate, 'dd/MM/yyyy');
    const fontSize = 12;
    const startY = page.getHeight() - height - 50 - fontSize; // Adjust Y coordinate based on logo height
    page.setFontSize(fontSize);
    page.drawText(`   La société CoConsult engage Mr/Mme "${contract.nameEmp}" pour une durée à compter 
    du ${startDateFormatted} au ${endDateFormatted} par un contrat de type "${contract.type}".
    L'ID de votre contrat est: ${contract.idContEmp}
    Date et signatures des deux parties précédées de la mention manuscrite «lu et approuvé» :`, {
      x: 50,
      y: startY
    });
    page.drawText(`Signature de l'employeur                                                         signature de l'employée `, {
      x: 50,
      y: 200
    });


   
   /* page.drawText(`Date et signatures des deux parties précédées de la mention manuscrite «lu et approuvé» :`, {
      x: 50,
      y: startY - 3 * textHeight,
    });*/
    

    // Save the PDF document to a buffer
    const pdfBytes = await pdfDoc.save();

    // Return the PDF buffer
    return pdfBytes;
  }

  // Function to load local image as ArrayBuffer
  private async getImageAsArrayBuffer(url: string): Promise<ArrayBuffer> {
    const response = await this.http.get(url, { responseType: 'arraybuffer' }).toPromise();
    console.log(response); // Log the response to check if it's undefined
    return response as ArrayBuffer; // Ensure response is ArrayBuffer
  }
  async drawSignature(pdfDoc: any, page: any, signatureImageBytes: ArrayBuffer | null) {
    if (signatureImageBytes === null) {
      console.error('Signature is null');
      // Handle the case where signature is null, maybe skip drawing the signature or throw an error
      return;
    }
  
    const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
    const { width, height } = signatureImage.scale(0.5); // Adjust signature size as needed
    page.drawImage(signatureImage, {
      x: 50, // X coordinate
      y: 100, // Y coordinate
      width,
      height,
    });
  }
  
    
}
