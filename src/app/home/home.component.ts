import { Component } from '@angular/core';
import { Home } from '../models/home';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AppComponent } from '../app.component';
import { NgxSpinnerService } from "ngx-spinner";

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

  constructor(public appComponent: AppComponent, private spinner: NgxSpinnerService){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.user = this.userSubject.asObservable();

    appComponent.setInfo(this.userSubject.value.infoUser.companyName);
    this.companyId = this.userSubject.value.infoUser.companyId;

    this.tiles = [
      {routerLink: '/sale', text: 'Venta', cols: 3, rows: 1, color: 'lightblue', icon: 'fa fa-shopping-bag', needAdmin: false, img: 'img/about.png'},
      {routerLink: '/product', text: 'Productos', cols: 1, rows: 2, color: 'lightgreen', icon: 'fa fa-list-alt', needAdmin: true, img: 'img/products.png'},
      {routerLink: '/sales', text: 'Ventas', cols: 1, rows: 1, color: 'lightpink', icon: 'fa fa-usd', needAdmin: true, img: 'img/sales.png'},
      {routerLink: '/category', text: 'Categorías', cols: 2, rows: 1, color: '#DDBDF1', icon: 'fa fa-file-text-o', needAdmin: true, img: 'img/about.png'},
    ];

    this.spinner.hide();
  }
  
}
