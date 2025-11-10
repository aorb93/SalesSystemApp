import { Component } from '@angular/core';
import { Home } from '../models/home';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AppComponent } from '../app.component';
import { NgxSpinnerService } from "ngx-spinner";
import { faCartShopping, faBoxOpen, faCashRegister, faBagShopping} from '@fortawesome/free-solid-svg-icons';
import { faShopify} from '@fortawesome/free-brands-svg-icons';

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
      {routerLink: '/sale', text: 'Venta', icon: faCartShopping, needAdmin: true, img: ''},
      {routerLink: '/product', text: 'Productos', icon: faBoxOpen, needAdmin: true, img: ''},
      {routerLink: '/sales', text: 'Ventas', icon: faBagShopping, needAdmin: true, img: ''},
      {routerLink: '/collect', text: 'Cobranza', icon: faCashRegister, needAdmin: true, img: ''},
    ];

    this.spinner.hide();
  }
  
}
