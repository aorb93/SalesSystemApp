import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { Client, insClient } from '../models/client';
import { ApiClientService } from '../services/api-client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogClientComponent } from './dialog-client/dialog-client.component';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  public _isMobile!: boolean;
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public lstClient!: Client[];

  public clients: number = 1;
  public width: string = '500px';
  public height: string = '500px';

  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  constructor(
    private spinner: NgxSpinnerService, 
    private isMobile: AppComponent, 
    private apiClient: ApiClientService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngOnInit(): void {
    this.spinner.show();
    this._isMobile = this.isMobile.isMobile;
    this.getClients(this.companyId);
  }

  getClients(companyId: number) {
    this.apiClient.getClients(companyId).subscribe(response => {
      this.lstClient = response;
      this.spinner.hide();
    });
  }

  openAdd(){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .55).toString() + 'px';
    
    const dialogRef = this.dialog.open(DialogClientComponent, {
      width: this.width,
      height: this.height,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClients(this.companyId);
    });
  }

  openEdit(client: Client){
    this.spinner.show();
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .55).toString() + 'px';

    const dialogRef = this.dialog.open(DialogClientComponent, {
      width: this.width,
      height: this.height,
      data: client,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getClients(this.companyId);
    });
  }

  delete(client: Client){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .25).toString() + 'px';

    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width,
      height: this.height,
      data: 'Cliente ' + client.clientName + ' ' + client.surname
    });

    let tmpClient: insClient = {
      clientId: client.clientId,
      clientName: client.clientName,
      surname: client.surname,
      credit: client.credit,
      companyId: this.companyId,
      enable: false,
      phone: client.phone,
      address: client.address
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiClient.delClient(tmpClient).subscribe(response => {
          if(response){
            this.snackBar.open('Cliente ' + client.clientName + ' ' + client.surname + ' eliminado con exito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.getClients(this.companyId);
          }
        });
      }
    });
  }
}
