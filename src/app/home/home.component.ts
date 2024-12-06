import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Home } from '../models/home';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public tiles: Home[] = [];

  public userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;
  public companyId!: number;

  constructor(public appComponent: AppComponent){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.user = this.userSubject.asObservable();

    appComponent.setInfo(this.userSubject.value.infoUser.companyName);
    this.companyId = this.userSubject.value.infoUser.companyId;

    this.tiles = [
      {routerLink: '/sale', text: 'Venta', cols: 3, rows: 1, color: 'lightblue'},
      {routerLink: '/product', text: 'Productos', cols: 1, rows: 2, color: 'lightgreen'},
      {routerLink: '', text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {routerLink: '/category', text: 'Categorías', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
  }
}
