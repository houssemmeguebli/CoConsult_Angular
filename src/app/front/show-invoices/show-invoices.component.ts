import { Component } from '@angular/core';
import {Invoices} from "../../_models/invoices";
import {ActivatedRoute} from "@angular/router";
import {InvoicesService} from "../../_services/invoices.service";

@Component({
  selector: 'app-show-invoices',
  templateUrl: './show-invoices.component.html',
  styleUrls: ['./show-invoices.component.css']
})
export class ShowInvoicesComponent {
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
