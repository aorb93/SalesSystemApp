import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { Brand } from '../models/brand';
import { ApiBrandService } from '../services/api-brand.service';
import { DialogBrandComponent } from './dialog-brand/dialog-brand.component';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {

  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  public lstBrand!: Brand[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public _isMobile!: boolean;

  public brands: number = 1;
  public width: string = '500px';
  public height: string = '500px';

  constructor( private apiBrand: ApiBrandService, public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private isMobile: AppComponent) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this._isMobile = this.isMobile.isMobile;
    this.getBrand(this.companyId);
  }

  getBrand(companyId: number) {
    this.apiBrand.getBrands(companyId).subscribe(response => {
      this.lstBrand = response;
      this.spinner.hide();
    });
  }

  openAdd(){
      this.width = (window.innerWidth * .85).toString() + 'px';
      this.height = (window.innerHeight * .40).toString() + 'px';
      
      const dialogRef = this.dialog.open(DialogBrandComponent, {
        width: this.width,
        height: this.height,
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getBrand(this.companyId);
      });
    }

  openEdit(brand: Brand){
    this.spinner.show();
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';

    const dialogRef = this.dialog.open(DialogBrandComponent, {
      width: this.width,
      height: this.height,
      data: brand,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getBrand(this.companyId);
    });
  }

  delete(brand: Brand){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .25).toString() + 'px';

    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width,
      height: this.height,
      data: 'Marca ' + brand.brandName
    });

    let tmpbrand: Brand = {
      brandId: brand.brandId,
      brandName: brand.brandName,
      companyId: this.companyId
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiBrand.delBrand(tmpbrand).subscribe(response => {
          if(response){
            this.snackBar.open('Cliente ' + brand.brandName + ' eliminado con exito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.getBrand(this.companyId);
          }
        });
      }
    });
  }
}
