import { Component, OnInit } from '@angular/core';
import { Collects } from '../models/home';
import { NgxSpinnerService } from 'ngx-spinner';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrl: './collect.component.scss'
})
export class CollectComponent implements OnInit {

  public tiles: Collects[] = [];
  
    constructor(private spinner: NgxSpinnerService){
      this.tiles = [
        {routerLink: '/collectWeek', text: 'Cobros semanales', icon: faCalendarWeek, needAdmin: true, img: ''}
      ];
    }
  
    ngOnInit(): void {
      this.spinner.hide();
    }
}
