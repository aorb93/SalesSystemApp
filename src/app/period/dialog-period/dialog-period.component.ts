import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Period } from '../../models/period';
import { ApiPeriodService } from '../../services/api-period.service';

@Component({
  selector: 'app-dialog-period',
  templateUrl: './dialog-period.component.html',
  styleUrl: './dialog-period.component.scss'
})
export class DialogPeriodComponent {
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public periodName!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogPeriodComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiPeriod: ApiPeriodService,
    @Inject(MAT_DIALOG_DATA) public period: Period
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.period !== null){
      this.periodName = this.period.periodName;
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }
  
  addPeriod() {
    this.spinner.show();

    let tmpPeriod: Period = {
      periodId: 0,
      periodName: this.periodName,
      companyId: this.companyId
    }

    this.apiPeriod.postPeriod(tmpPeriod).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpPeriod.periodName + ' agregada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editPeriod() {
    this.spinner.show();

    let tmpPeriod: Period = {
      periodId: this.period.periodId,
      periodName: this.periodName,
      companyId: this.companyId
    }

    this.apiPeriod.putPeriod(tmpPeriod).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpPeriod.periodName + ' editada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
