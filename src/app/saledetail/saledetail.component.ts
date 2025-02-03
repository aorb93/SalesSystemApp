import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-saledetail',
  templateUrl: './saledetail.component.html',
  styleUrl: './saledetail.component.scss'
})
export class SaledetailComponent {
  @Input() recibidoDePadre!: string;
}
