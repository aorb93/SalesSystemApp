import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Client, insClient } from '../../models/client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogProductComponent } from '../../product/dialog-product/dialog-product.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiClientService } from '../../services/api-client.service';

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

  constructor(
    public dialogRef: MatDialogRef<DialogProductComponent>,
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
    }
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }

  editProduct() {

  }
  
  addProduct() {
    this.spinner.show();

    let tmpClient: insClient = {
      clientId: 0,
      clientName: this.clientName,
      surname: this.surName,
      credit: this.credit,
      companyId: this.companyId,
      enable: true
    }

    this.apiClient.postClient(tmpClient).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Producto ' + tmpClient.clientName + ' ' + tmpClient.surname + ' agregado', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
