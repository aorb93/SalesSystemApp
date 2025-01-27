import { Component } from '@angular/core';
import { ApiProductService } from '../services/api-product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Product } from '../models/product';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { DialogProductComponent } from '../product/dialog-product/dialog-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck
  public products: number = 1;
  public width: string = '500px';

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
    this.width = (window.innerWidth * .85).toString() + 'px';
    
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: this.width,
      height: '700px'
    });

    console.log(dialogRef);
    console.log(this.dialog);

    dialogRef.afterClosed().subscribe(result => {
      this.getProduct(this.companyId);
    });
  }

  openEdit(product: Product){
    
  }
}
