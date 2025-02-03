import { Component, OnInit } from '@angular/core';
import { ApiSalesService } from '../services/api-sales.service';
import { Sales } from '../models/sales';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {

  public lstSales!: Sales[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public columns: string[] = ['clientName', 'total', 'creationDate', 'actions']
  public faEye = faEye;
  public sales: number = 1;

  constructor(
      private apiSales: ApiSalesService,
      private spinner: NgxSpinnerService,
      private router: Router
    ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
      this.companyId = this.userSubject.value.infoUser.companyId;
    }

  ngOnInit(): void {
    this.spinner.show();
    this.getSales(this.companyId);
  }

  getSales(companyId: number){
    
    this.apiSales.getSales(companyId).subscribe(sales => {
      this.lstSales = sales;
      this.spinner.hide();
    });
  }

  openDetail(saleId: number){
    const urlTree = this.router.parseUrl(this.router.url);
    console.log(saleId);
  }
}
