import { Component, OnInit } from '@angular/core';
import { Invoices } from '../../_models/invoices';
import { InvoicesService } from '../../_services/invoices.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices: Invoices[] = [];

  constructor(private invoicesService: InvoicesService, private router:Router) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoicesService.getAllInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  viewInvoice(id: number): void {
    // Mettre en œuvre la logique pour afficher les détails de la facture
    console.log("Afficher la facture avec l'ID :", id);
  }

  deleteInvoice(id: number): void {
    this.invoicesService.deleteInvoice(id).subscribe(() => {
      // Mettre à jour la liste des factures après la suppression
      this.loadInvoices();
    });
  }

  viewInvoiceDetails(invoice: Invoices) {
    // Rediriger vers la page de détails de la facture avec l'ID de la facture
    this.router.navigate(['/back/invoices-detail', invoice.idInvoices]);
  }
}
