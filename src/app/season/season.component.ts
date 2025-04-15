import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { Season } from '../models/season';
import { ApiSeasonService } from '../services/api-season.service';
import { DialogSeasonComponent } from './dialog-season/dialog-season.component';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrl: './season.component.scss'
})
export class SeasonComponent {
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  public lstSeason!: Season[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public _isMobile!: boolean;

  public brands: number = 1;
  public width: string = '500px';
  public height: string = '500px';

  constructor( private apiSeason: ApiSeasonService, public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private isMobile: AppComponent) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this._isMobile = this.isMobile.isMobile;
    this.getSeason(this.companyId);
  }

  getSeason(companyId: number) {
    this.apiSeason.getSeasons(companyId).subscribe(response => {
      this.lstSeason = response;
      this.spinner.hide();
    });
  }

  openAdd(){
      this.width = (window.innerWidth * .85).toString() + 'px';
      this.height = (window.innerHeight * .40).toString() + 'px';
      
      const dialogRef = this.dialog.open(DialogSeasonComponent, {
        width: this.width,
        height: this.height,
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getSeason(this.companyId);
      });
    }

  openEdit(season: Season){
    this.spinner.show();
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .40).toString() + 'px';

    const dialogRef = this.dialog.open(DialogSeasonComponent, {
      width: this.width,
      height: this.height,
      data: season,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getSeason(this.companyId);
    });
  }

  delete(season: Season){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .25).toString() + 'px';

    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width,
      height: this.height,
      data: 'Talla ' + season.seasonName
    });

    let tmpSeason: Season = {
      seasonId: season.seasonId,
      seasonName: season.seasonName,
      companyId: this.companyId
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiSeason.delSeason(tmpSeason).subscribe(response => {
          if(response){
            this.snackBar.open('Talla ' + season.seasonName + ' eliminada con exito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.getSeason(this.companyId);
          }
        });
      }
    });
  }
}
