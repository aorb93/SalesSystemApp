import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Size } from '../../models/size';
import { ApiSizeService } from '../../services/api-size.service';

@Component({
  selector: 'app-dialog-size',
  templateUrl: './dialog-size.component.html',
  styleUrl: './dialog-size.component.scss'
})
export class DialogSizeComponent {
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public sizeName!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogSizeComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiSize: ApiSizeService,
    @Inject(MAT_DIALOG_DATA) public size: Size
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.size !== null){
      this.sizeName = this.size.sizeName;
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }
  
  addSize() {
    this.spinner.show();

    let tmpSize: Size = {
      sizeName: this.sizeName,
      companyId: this.companyId
    }

    this.apiSize.postSize(tmpSize).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpSize.sizeName + ' agregada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editSize() {
    this.spinner.show();

    let tmpSize: Size = {
      sizeId: this.size.sizeId,
      sizeName: this.sizeName,
      companyId: this.companyId
    }

    this.apiSize.putSize(tmpSize).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpSize.sizeName + ' editada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
