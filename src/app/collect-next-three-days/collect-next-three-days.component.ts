import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { CollectNextThreeDays } from '../models/collect';
import { ApiCollectsService } from '../services/api-collects.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collect-next-three-days',
  templateUrl: './collect-next-three-days.component.html',
  styleUrl: './collect-next-three-days.component.scss'
})
export class CollectNextThreeDaysComponent implements OnInit {

  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public lstCollectNextThreeDays: CollectNextThreeDays[] = [];

  public collectNextThreeDays: number = 1;

  constructor(
    private apiCollects: ApiCollectsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngOnInit(): void {
    this.getCollectNextThreeDays(this.companyId);
  }

  getCollectNextThreeDays(companyId: number){
    this.apiCollects.getCollectNextThreeDays(companyId).subscribe(response => {
      this.lstCollectNextThreeDays = this.setColorDay(response);
      console.log(this.lstCollectNextThreeDays);
    });
  }

  setColorDay(nextThreeDays: CollectNextThreeDays[]){
    // if(nextThreeDays.length > 0){
    //   for(let i = 0; nextThreeDays.length < i; i++){
    //     nextThreeDays[i].colorDay = 'table-danger';
    //   }
    // }

    return nextThreeDays;
  }

}
