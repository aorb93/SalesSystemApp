import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiClientService } from '../../services/api-client.service';
import { Brand } from '../../models/brand';
import { ApiBrandService } from '../../services/api-brand.service';

@Component({
  selector: 'app-dialog-brand',
  templateUrl: './dialog-brand.component.html',
  styleUrl: './dialog-brand.component.scss'
})
export class DialogBrandComponent implements OnInit{
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public brandName!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBrandComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiBrand: ApiBrandService,
    @Inject(MAT_DIALOG_DATA) public brand: Brand
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.brand !== null){
      this.brandName = this.brand.brandName;
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }
  
  addBrand() {
    this.spinner.show();

    let tmpBrand: Brand = {
      brandName: this.brandName,
      companyId: this.companyId
    }

    this.apiBrand.postBrand(tmpBrand).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Marca ' + tmpBrand.brandName + ' agregada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editBrand() {
    this.spinner.show();

    let tmpBrand: Brand = {
      brandId: this.brand.brandId,
      brandName: this.brandName,
      // brandTypeId: this.brand.brandTypeId,
      companyId: this.companyId
    }

    this.apiBrand.putBrand(tmpBrand).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Marca ' + tmpBrand.brandName + ' editada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
