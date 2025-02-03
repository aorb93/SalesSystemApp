import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Client, insClient } from '../../models/client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiClientService } from '../../services/api-client.service';
import { NgxMaskConfig } from 'ngx-mask'

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrl: './dialog-client.component.scss'
})
export class DialogClientComponent implements OnInit{
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public clientName!: string;
  public surName!: string;
  public credit: boolean = false;
  public phone!: string;
  public address!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogClientComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiClient: ApiClientService,
    @Inject(MAT_DIALOG_DATA) public client: Client
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.client !== null){
      this.clientName = this.client.clientName;
      this.surName = this.client.surname;
      this.credit = this.client.credit;
      this.phone = this.client.phone;
      this.address = this.client.address;
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }
  
  addClient() {
    this.spinner.show();

    let tmpClient: insClient = {
      clientId: 0,
      clientName: this.clientName,
      surname: this.surName != null ? this.surName : '',
      credit: this.credit,
      companyId: this.companyId,
      enable: true,
      phone: this.phone != null ? this.phone : '',
      address: this.address != null ? this.address : ''
    }

    this.apiClient.postClient(tmpClient).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Cliente ' + tmpClient.clientName + ' ' + tmpClient.surname + ' agregado', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editClient() {
    this.spinner.show();

    let tmpClient: insClient = {
      clientId: this.client.clientId,
      clientName: this.clientName,
      surname: this.surName != null ? this.surName : '',
      credit: this.credit,
      companyId: this.companyId,
      enable: true,
      phone: this.phone != null ? this.phone : '',
      address: this.address != null ? this.address : ''
    }

    this.apiClient.putClient(tmpClient).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Cliente ' + tmpClient.clientName + ' ' + tmpClient.surname + ' editado', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
