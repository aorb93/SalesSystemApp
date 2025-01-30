import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService){

  }

  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();
  }
}
