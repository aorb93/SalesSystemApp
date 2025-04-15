import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Season } from '../../models/season';
import { ApiSeasonService } from '../../services/api-season.service';

@Component({
  selector: 'app-dialog-season',
  templateUrl: './dialog-season.component.html',
  styleUrl: './dialog-season.component.scss'
})
export class DialogSeasonComponent {
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public seasonName!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogSeasonComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiSeason: ApiSeasonService,
    @Inject(MAT_DIALOG_DATA) public season: Season
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.season !== null){
      this.seasonName = this.season.seasonName;
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }
  
  addSeason() {
    this.spinner.show();

    let tmpSeason: Season = {
      seasonId: 0,
      seasonName: this.seasonName,
      companyId: this.companyId
    }

    this.apiSeason.postSeason(tmpSeason).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpSeason.seasonName + ' agregada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editSeason() {
    this.spinner.show();

    let tmpSeason: Season = {
      seasonId: this.season.seasonId,
      seasonName: this.seasonName,
      companyId: this.companyId
    }

    this.apiSeason.putSeason(tmpSeason).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpSeason.seasonName + ' editada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
