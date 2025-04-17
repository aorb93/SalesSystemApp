import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentType } from '../../models/paymentType';
import { ApiPaymentTypeService } from '../../services/api-payment-type.service';

@Component({
  selector: 'app-dialog-payment-type',
  templateUrl: './dialog-payment-type.component.html',
  styleUrl: './dialog-payment-type.component.scss'
})
export class DialogPaymentTypeComponent {
public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public paymentTypeName!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogPaymentTypeComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiPaymentType: ApiPaymentTypeService,
    @Inject(MAT_DIALOG_DATA) public paymentType: PaymentType
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.paymentType !== null){
      this.paymentTypeName = this.paymentType.paymentTypeName;
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }
  
  addPaymentType() {
    this.spinner.show();

    let tmpPaymentType: PaymentType = {
      paymentTypeId: 0,
      paymentTypeName: this.paymentTypeName,
      companyId: this.companyId
    }

    this.apiPaymentType.postPaymentType(tmpPaymentType).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpPaymentType.paymentTypeName + ' agregada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editPaymentType() {
    this.spinner.show();

    let tmpPaymentType: PaymentType = {
      paymentTypeId: this.paymentType.paymentTypeId,
      paymentTypeName: this.paymentTypeName,
      companyId: this.companyId
    }

    this.apiPaymentType.putPaymentType(tmpPaymentType).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Tipo de pago ' + tmpPaymentType.paymentTypeName + ' editado', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
