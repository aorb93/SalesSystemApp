import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Catalogs } from '../models/home';
import { faList, faListCheck, faChildren, faTags, faCloudSun, faTextHeight, faPalette, faCreditCard, faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons';
// import { faLayerGroup } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrl: './catalogs.component.scss'
})
export class CatalogsComponent implements OnInit {

  public tiles: Catalogs[] = [];

  constructor(private spinner: NgxSpinnerService){
    this.tiles = [
      {routerLink: '/gender', text: 'Género', icon: faChildren, needAdmin: true, img: ''},
      {routerLink: '/brand', text: 'Marcas', icon: faTags, needAdmin: true, img: ''},
      {routerLink: '/category', text: 'Categorías', icon: faList, needAdmin: true, img: ''},
      {routerLink: '/category', text: 'Sub-Categorías', icon: faListCheck, needAdmin: true, img: ''},
      {routerLink: '/category', text: 'Temporada', icon: faCloudSun, needAdmin: true, img: ''},
      {routerLink: '/category', text: 'Tallas', icon: faTextHeight, needAdmin: true, img: ''},
      {routerLink: '/category', text: 'Colores', icon: faPalette, needAdmin: true, img: ''},
      {routerLink: '/category', text: 'Periodos de pago', icon: faMoneyCheckDollar, needAdmin: true, img: ''},
      {routerLink: '/category', text: 'Tipos de pago', icon: faCreditCard, needAdmin: true, img: ''},
    ];
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

}
