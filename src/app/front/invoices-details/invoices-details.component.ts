// invoices-details.component.ts
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { InvoicesService } from '../../_services/invoices.service';
import { Invoices } from '../../_models/invoices';

@Component({
  selector: 'app-invoices-details',
  templateUrl: './invoices-details.component.html',
  styleUrls: ['./invoices-details.component.css']
})
export class InvoicesDetailsComponent implements OnInit {
  idContrat!: number;
  invoices: Invoices[] = [];

  constructor(private route: ActivatedRoute, private invoicesService: InvoicesService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idContrat = params['idContrat'];
      if (idContrat && !isNaN(Number(idContrat))) {
        this.idContrat = Number(idContrat);
        console.log("Contrat ID:", this.idContrat);
        this.loadInvoicesByContratId(this.idContrat);
      } else {
        console.error("Invalid contratId:", idContrat);
        // Navigate to an error page or display a message to the user
      }
    });
  }


  loadInvoicesByContratId(contratId: number) {
    this.invoicesService.getAllInvoices().subscribe(invoices => {
      console.log("Invoices:", invoices);
      this.invoices = invoices.filter(invoice => invoice.idContrat === contratId);
    });
  }
  viewInvoiceDetails(invoice: Invoices) {
    // Rediriger vers la page de détails de la facture avec l'ID de la facture
    this.router.navigate(['/front/show-invoices', invoice.idInvoices]);
  }
}
