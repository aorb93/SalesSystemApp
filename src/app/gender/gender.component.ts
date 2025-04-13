import { Component, OnInit } from '@angular/core';
import { ApiGenderService } from '../services/api-gender.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gender } from '../models/gender';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { DialogGenderComponent } from './dialog-gender/dialog-gender.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss'
})
export class GenderComponent implements OnInit {

  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public lstGender: Gender[] = [];
  public width: string = '500px';
  public height: string = '500px';

  public gender: number = 1;

  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  constructor(
      private apiGender: ApiGenderService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      private spinner: NgxSpinnerService
    ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
      this.companyId = this.userSubject.value.infoUser.companyId;
    }

  ngOnInit(): void {
    this.spinner.show();
    this.getGender(this.companyId);
  }

  getGender(companyId: number){
    this.apiGender.getGender(companyId).subscribe(response => {
      this.lstGender = response;
      this.spinner.hide();
    });
  }

  openAdd(){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';

    const dialogRef = this.dialog.open(DialogGenderComponent, {
      width: this.width,
      height: this.height,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGender(this.companyId);
    });
  }

  openEdit(gender: Gender){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';

    const dialogRef = this.dialog.open(DialogGenderComponent, {
      width: this.width,
      height: this.height,
      autoFocus: false,
      data: gender
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGender(this.companyId);
    });
  }

  delete(gender: Gender){
      this.width = (window.innerWidth * .85).toString() + 'px';
      this.height = (window.innerHeight * .25).toString() + 'px';
  
      const dialogRef = this.dialog.open(DialogDeleteComponente, {
        width: this.width,
        height: this.height,
        data: 'Género ' + gender.genderName
      });
  
      let tmpGender: Gender = {
        genderId: gender.genderId,
        genderName: gender.genderName,
        companyId: this.companyId
      }
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiGender.deleteGender(tmpGender).subscribe(response => {
            if(response){
              this.snackBar.open('Género ' + gender.genderName + ' eliminado con exito', '', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });
              this.getGender(this.companyId);
            }
          });
        }
      });
    }
}
