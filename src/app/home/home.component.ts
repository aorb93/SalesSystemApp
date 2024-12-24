import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Home } from '../models/home';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { pieChart } from '../models/pieChart'
import { AppComponent } from '../app.component';
import { NgxSpinnerService } from "ngx-spinner";
import { BestProduct, BestClient } from '../models/statistics';
import { ApiStatisticsService } from '../services/api-statistics.service';
import { Chart, ChartType } from 'chart.js/auto';


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
  public lstBestProduct!: BestProduct[];

  public chart: any;

  constructor(public appComponent: AppComponent, private apiStatistics: ApiStatisticsService, private spinner: NgxSpinnerService){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.user = this.userSubject.asObservable();

    appComponent.setInfo(this.userSubject.value.infoUser.companyName);
    this.companyId = this.userSubject.value.infoUser.companyId;

    this.tiles = [
      {routerLink: '/sale', text: 'Venta', cols: 3, rows: 1, color: 'lightblue', icon: 'fa fa-shopping-bag', needAdmin: false},
      {routerLink: '/product', text: 'Productos', cols: 1, rows: 2, color: 'lightgreen', icon: 'fa fa-list-alt', needAdmin: true},
      {routerLink: '/sales', text: 'Ventas', cols: 1, rows: 1, color: 'lightpink', icon: 'fa fa-usd', needAdmin: true},
      {routerLink: '/category', text: 'Categorías', cols: 2, rows: 1, color: '#DDBDF1', icon: 'fa fa-file-text-o', needAdmin: true},
    ];

    this.spinner.hide();
  }

  ngOnInit(): void {
    this.getBestProduct(this.companyId);
  }

  getBestProduct(companyId: number){
    this.apiStatistics.getBestProduct(companyId).subscribe(BP => {
      this.getPieChart(BP);
    });
  }
   

  getPieChart(BP: BestProduct[]){
    let productos: string[] = [];
    let quantity: number[] = [];

    for(let i = 0; i < BP.length; i++){
      productos.push(BP[i].productName);
      quantity.push(BP[i].quantity);
    }

    const _data = {
      labels: productos,
      datasets: [{
        label: 'Mas Vendidos',
        data: quantity,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    this.chart = new Chart("chart", {
      type: 'pie' as ChartType, // tipo de la gráfica 
      data: _data, // datos 
    });
  }

  getBarChart(BC: BestClient[]){

  }
}
