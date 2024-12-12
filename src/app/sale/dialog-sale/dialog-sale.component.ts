import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sale } from "../../models/sale";
import { ApiSaleService } from "../../services/api-sale.service";

@Component({
  selector: 'app-dialog-sale',
  templateUrl: './dialog-sale.component.html',
  styleUrl: './dialog-sale.component.scss'
})
export class DialogSaleComponent {
  public nameCategory!: string;
  public response!: Response[];

  constructor(
          public dialogRef: MatDialogRef<DialogSaleComponent>,
          public apiSale: ApiSaleService,
          public snackBar: MatSnackBar,
          @Inject(MAT_DIALOG_DATA) public sale: Sale
      ){
          if(this.sale !== null){
          }
      }

  close(){
    this.dialogRef.close();
  }

  saveSale(){
    
  }
}
