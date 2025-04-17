import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { PaymentType } from '../models/paymentType';
import { ApiPaymentTypeService } from '../services/api-payment-type.service';
import { DialogPaymentTypeComponent } from './dialog-payment-type/dialog-payment-type.component';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrl: './payment-type.component.scss'
})
export class PaymentTypeComponent {
public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  public lstPaymentType!: PaymentType[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public _isMobile!: boolean;

  public brands: number = 1;
  public width: string = '500px';
  public height: string = '500px';

  constructor( private apiPaymentType: ApiPaymentTypeService, public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private isMobile: AppComponent) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this._isMobile = this.isMobile.isMobile;
    this.getPaymentType(this.companyId);
  }

  getPaymentType(companyId: number) {
    this.apiPaymentType.getPaymentTypes(companyId).subscribe(response => {
      this.lstPaymentType = response;
      this.spinner.hide();
    });
  }

  openAdd(){
      this.width = (window.innerWidth * .85).toString() + 'px';
      this.height = (window.innerHeight * .40).toString() + 'px';
      
      const dialogRef = this.dialog.open(DialogPaymentTypeComponent, {
        width: this.width,
        height: this.height,
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getPaymentType(this.companyId);
      });
    }

  openEdit(paymentType: PaymentType){
    this.spinner.show();
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';

    const dialogRef = this.dialog.open(DialogPaymentTypeComponent, {
      width: this.width,
      height: this.height,
      data: paymentType,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getPaymentType(this.companyId);
    });
  }

  delete(paymentType: PaymentType){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .25).toString() + 'px';

    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width,
      height: this.height,
      data: 'Talla ' + paymentType.paymentTypeName
    });

    let tmpPaymentType: PaymentType = {
      paymentTypeId: paymentType.paymentTypeId,
      paymentTypeName: paymentType.paymentTypeName,
      companyId: this.companyId
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiPaymentType.delPaymentType(tmpPaymentType).subscribe(response => {
          if(response){
            this.snackBar.open('Talla ' + paymentType.paymentTypeName + ' eliminada con exito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.getPaymentType(this.companyId);
          }
        });
      }
    });
  }
}
