import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiSalesService } from '../services/api-sales.service';
import { Sales, SalesDetail, SalesDetailProducts, SalesDetailCredit } from '../models/sales';

@Component({
  selector: 'app-saledetail',
  templateUrl: './saledetail.component.html',
  styleUrl: './saledetail.component.scss'
})
export class SaledetailComponent implements OnInit {
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public lstSalesDetail!: SalesDetail[];
  public lstSalesDetailProducts!: SalesDetailProducts[];
  public lstSalesDetailCredit!: SalesDetailCredit[];

  public paginationSales: number = 1;

  public loadSalesDetail: boolean = false;
  public loadSalesDetailProducts: boolean = false;
  public loadSalesDetailCredit: boolean = false;

  public showCredit: boolean = false;

  @Input({ transform: numberAttribute }) saleId!: number;

  constructor(private apiSales: ApiSalesService, private spinner: NgxSpinnerService){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngOnInit(): void {
    this.getSalesDetail(this.companyId, this.saleId);
    this.getSalesDetailProducts(this.companyId, this.saleId);
    this.getSalesDetailCredit(this.companyId, this.saleId);
  }

  loaDone(){
    if(this.loadSalesDetailProducts && this.loadSalesDetailCredit && this.loadSalesDetail){
      this.spinner.hide();
    }
  }

  getSalesDetail(companyId: number, saleId: number){
    this.apiSales.getSalesDetail(companyId, saleId).subscribe(sales => {
      this.lstSalesDetail = sales;
      this.loadSalesDetail = true;
      this.loaDone();
    });
  }

  getSalesDetailProducts(companyId: number, saleId: number){
    this.apiSales.getSalesDetailProducts(companyId, saleId).subscribe(sales => {
      this.lstSalesDetailProducts = sales;
      this.loadSalesDetailProducts = true;
      this.loaDone();
    });
  }

  getSalesDetailCredit(companyId: number, saleId: number){
    this.apiSales.getSalesDetailCredit(companyId, saleId).subscribe(sales => {
      this.lstSalesDetailCredit = sales;
      this.showCredit = this.lstSalesDetailCredit.length > 0 ? true : false;
      this.loadSalesDetailCredit = true;
      this.loaDone();
    });
  }
}
