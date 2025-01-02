import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Home } from '../models/home';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { pieChart } from '../models/pieChart'
import { AppComponent } from '../app.component';
import { NgxSpinnerService } from "ngx-spinner";
import { BestProduct, BestClient, SalesMonths } from '../models/statistics';
import { ApiStatisticsService } from '../services/api-statistics.service';
import { Chart, ChartType } from 'chart.js/auto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  public tiles: Home[] = [];

  public userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;
  public companyId!: number;
  public lstBestProduct!: BestProduct[];

  public chartBestProduct: any;
  public chartBestClient: any;
  public _chartMonthSales: any;

  @ViewChild('chartMonthSales') chartMonthSales!: ElementRef;

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

  ngAfterViewInit(){
    this.getMonthSales(this.companyId);
  }

  ngOnInit(): void {
    this.getBestProduct(this.companyId);
    this.getBestClient(this.companyId);
    // this.getMonthSales();
  }

  getBestProduct(companyId: number){
    this.apiStatistics.getBestProduct(companyId).subscribe(BP => {
      this.getPieChart(BP);
    });
  }

  getBestClient(companyId: number){
    this.apiStatistics.getBestClient(companyId).subscribe(BC => {
      this.getBarChart(BC);
    });
  }

  getMonthSales(companyId: number){
    this.apiStatistics.getSalesMonts(companyId).subscribe(SM => {
      this.getLineChart(SM);
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

    this.chartBestProduct = new Chart("chartBestProduct", {
      type: 'pie' as ChartType, // tipo de la gráfica 
      data: _data, // datos 
    });
  }

  getBarChart(BC: BestClient[]){
    let clients: string[] = [];
    let quantity: number[] = [];

    for(let i = 0; i < BC.length; i++){
      clients.push(BC[i].clientName);
      quantity.push(BC[i].quantity);
    }

    const data = {
      labels: clients,
      datasets: [{
        label: 'Mejor Cliente',
        data: quantity,
        backgroundColor: [
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }]
    };
 
    // Creamos la gráfica
    this.chartBestClient = new Chart("chartBestClient", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data, // datos 
      options: { // opciones de la gráfica 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  getLineChart(SM: SalesMonths[]){
    let months: string[] = [];
    let quantity: number[] = [];
    let total: number[] = [];

    for(let i = 0; i < SM.length; i++){
      months.push(SM[i].shortName);
      quantity.push(SM[i].quantity);
      total.push(SM[i].total);
    }

    const data = {
      labels: months,
      datasets: [{
        label: 'Ventas por Mes',
        data: total,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    // Creamos la gráfica
    this._chartMonthSales = new Chart("chartMonthSales", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: data // datos 
    });
  }
}
