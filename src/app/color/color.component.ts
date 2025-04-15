import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { Color } from '../models/color';
import { ApiColorService } from '../services/api-color.service';
import { DialogColorComponent } from './dialog-color/dialog-color.component';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent {
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  public lstColor!: Color[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public _isMobile!: boolean;

  public brands: number = 1;
  public width: string = '500px';
  public height: string = '500px';

  constructor( private apiColor: ApiColorService, public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private isMobile: AppComponent) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this._isMobile = this.isMobile.isMobile;
    this.getColor(this.companyId);
  }

  getColor(companyId: number) {
    this.apiColor.getColors(companyId).subscribe(response => {
      this.lstColor = response;
      this.spinner.hide();
    });
  }

  openAdd(){
      this.width = (window.innerWidth * .85).toString() + 'px';
      this.height = (window.innerHeight * .40).toString() + 'px';
      
      const dialogRef = this.dialog.open(DialogColorComponent, {
        width: this.width,
        height: this.height,
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getColor(this.companyId);
      });
    }

  openEdit(color: Color){
    this.spinner.show();
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';

    const dialogRef = this.dialog.open(DialogColorComponent, {
      width: this.width,
      height: this.height,
      data: color,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getColor(this.companyId);
    });
  }

  delete(color: Color){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .25).toString() + 'px';

    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width,
      height: this.height,
      data: 'Talla ' + color.colorName
    });

    let tmpColor: Color = {
      colorId: color.colorId,
      colorName: color.colorName,
      companyId: this.companyId
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiColor.delColor(tmpColor).subscribe(response => {
          if(response){
            this.snackBar.open('Talla ' + color.colorName + ' eliminada con exito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.getColor(this.companyId);
          }
        });
      }
    });
  }
}
