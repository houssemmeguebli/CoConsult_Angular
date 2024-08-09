import { Component } from '@angular/core';
import {Invoices} from "../../_models/invoices";
import {ActivatedRoute} from "@angular/router";
import {InvoicesService} from "../../_services/invoices.service";

@Component({
  selector: 'app-invoices-detail',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.css']
})
export class InvoicesDetailComponent {
  invoice: Invoices | undefined;

  constructor(
    private route: ActivatedRoute,
    private invoicesService: InvoicesService
  ) { }

  ngOnInit(): void {
    this.getInvoiceDetails();
  }

  getInvoiceDetails(): void {
    const id = this.route.snapshot.params['id'];
    this.invoicesService.getInvoiceById(id).subscribe(invoice => this.invoice = invoice);
  }

}
