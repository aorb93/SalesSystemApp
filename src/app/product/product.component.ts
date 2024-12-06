import { Component } from '@angular/core';
import { ApiProductService } from '../services/api-product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  public columns: string[] = ['productId', 'productName', 'price', 'quantity', 'actions']

  public lstProduct!: any[]; //Product[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  constructor( private apiProduct: ApiProductService, public dialog: MatDialog, public snackBar: MatSnackBar) {

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
    
  }
  
  ngOnInit(): void {
    this.getProduct(this.companyId);
  }

  getProduct(companyId: number) {
    this.apiProduct.getProducts(companyId).subscribe(response => {
      this.lstProduct = response;
    });
  }

  public lstGetProduct(companyId: number): any {
    this.apiProduct.getProducts(companyId).subscribe(response => {
      return this.lstProduct = response;
    });
  }

  openAdd(){

  }

  openEdit(product: Product){
    
  }
}
