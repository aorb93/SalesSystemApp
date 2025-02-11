import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { CollectWeek } from '../models/collect';
import { ApiCollectsService } from '../services/api-collects.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collect-week',
  templateUrl: './collect-week.component.html',
  styleUrl: './collect-week.component.scss'
})
export class CollectWeekComponent implements OnInit {

  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public lstCollectWeek: CollectWeek[] = [];

  public collectWeek: number = 1;

  constructor(
    private apiCollects: ApiCollectsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngOnInit(): void {
    this.getCollectWeek(this.companyId);
  }

  getCollectWeek(companyId: number){
    this.apiCollects.getCollectWeek(companyId).subscribe(response => {
      this.lstCollectWeek = response;
    });
  }

}
