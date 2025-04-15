import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Color } from '../../models/color';
import { ApiColorService } from '../../services/api-color.service';

@Component({
  selector: 'app-dialog-color',
  templateUrl: './dialog-color.component.html',
  styleUrl: './dialog-color.component.scss'
})
export class DialogColorComponent {
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public colorName!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogColorComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiColor: ApiColorService,
    @Inject(MAT_DIALOG_DATA) public color: Color
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.color !== null){
      this.colorName = this.color.colorName;
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }
  
  addColor() {
    this.spinner.show();

    let tmpColor: Color = {
      colorId: 0,
      colorName: this.colorName,
      companyId: this.companyId
    }

    this.apiColor.postColor(tmpColor).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpColor.colorName + ' agregada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editColor() {
    this.spinner.show();

    let tmpColor: Color = {
      colorId: this.color.colorId,
      colorName: this.colorName,
      companyId: this.companyId
    }

    this.apiColor.putColor(tmpColor).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpColor.colorName + ' editada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
