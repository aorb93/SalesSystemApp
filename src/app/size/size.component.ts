import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { Size } from '../models/size';
import { ApiSizeService } from '../services/api-size.service';
import { DialogSizeComponent } from './dialog-size/dialog-size.component';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss'
})
export class SizeComponent {
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  public lstSize!: Size[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public _isMobile!: boolean;

  public brands: number = 1;
  public width: string = '500px';
  public height: string = '500px';

  constructor( private apiSize: ApiSizeService, public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private isMobile: AppComponent) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this._isMobile = this.isMobile.isMobile;
    this.getSize(this.companyId);
  }

  getSize(companyId: number) {
    this.apiSize.getSizes(companyId).subscribe(response => {
      this.lstSize = response;
      this.spinner.hide();
    });
  }

  openAdd(){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';
    
    const dialogRef = this.dialog.open(DialogSizeComponent, {
      width: this.width,
      height: this.height,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSize(this.companyId);
    });
  }

  openEdit(size: Size){
    this.spinner.show();
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';

    const dialogRef = this.dialog.open(DialogSizeComponent, {
      width: this.width,
      height: this.height,
      data: size,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getSize(this.companyId);
    });
  }

  delete(size: Size){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .25).toString() + 'px';

    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width,
      height: this.height,
      data: 'Talla ' + size.sizeName
    });

    let tmpSize: Size = {
      sizeId: size.sizeId,
      sizeName: size.sizeName,
      companyId: this.companyId
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiSize.delSize(tmpSize).subscribe(response => {
          if(response){
            this.snackBar.open('Talla ' + size.sizeName + ' eliminada con exito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.getSize(this.companyId);
          }
        });
      }
    });
  }
}
