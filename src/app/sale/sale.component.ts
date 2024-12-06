import { Component, ViewChild } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { MatOptionModule } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Product } from '../models/product';
import { ApiProductService } from '../services/api-product.service';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  
  public productSelect!: string;
  public product!: ProductComponent;

  public selectProduct!: any[]; //Product[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public productId!: number;

  public selectProductId!: number;

  public addSelectProduct: Product[] = [];
  public columns: string[] = ['productId', 'productName', 'price', 'quantity'];
  public total: number = 0;
  
  @ViewChild(MatTable) table!: MatTable<Product>;

  constructor(private apiProduct: ApiProductService, public option: MatOptionModule, private spinner: NgxSpinnerService){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngOnInit(): void {
    this.getProduct(this.companyId);
  }
  
  getProduct(companyId: number) {
    this.spinner.show();
    this.apiProduct.getProducts(companyId).subscribe(response => {
      this.selectProduct = response;
      this.spinner.hide();
    });
  }

  addProduct(){
    this.spinner.show();
    if(this.selectProductId !== 0 && this.selectProductId !== undefined){
      this.apiProduct.getProduct(this.companyId, this.selectProductId).subscribe(response => {
        response[0].quantitySale = 1;
        this.addSelectProduct.push(response[0]);
        this.table.renderRows();
        this.selectProductId = 0;
        this.getTotal();
      });
    }
  }

  selectOpt(event: any){
    this.selectProductId = event.value;
  }

  getTotal(){
    this.total = 0;
    for(let i = 0; i < this.addSelectProduct.length; i++){
      this.total += (this.addSelectProduct[i].price * this.addSelectProduct[i].quantitySale);
    }
    this.spinner.hide();
  }

  subtract(id: number){
    this.addSelectProduct.map(function(p){
      if(p.productId == id){
        p.quantitySale--;
        if(p.quantitySale === 0)
          p.quantitySale = 1;
      }
    });
    this.table.renderRows();
    this.getTotal();
  }

  add(id: number){
    this.addSelectProduct.map(function(p){
      if(p.productId == id){
        p.quantitySale++;
      }
    });
    this.table.renderRows();
    this.getTotal();
  }
}
