import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sale } from "../../models/sale";
import { ApiSaleService } from "../../services/api-sale.service";
import { ProductSaleConfirm, SaleConfirm } from "../../models/saleConfirm";
import { ApiProductService } from "../../services/api-product.service";
import { ApiClientService } from "../../services/api-client.service";
import { Client } from "../../models/client";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dialog-sale',
  templateUrl: './dialog-sale.component.html',
  styleUrl: './dialog-sale.component.scss'
})
export class DialogSaleComponent {

  public saleConfirm!: SaleConfirm;
  public selectClient!: Client[];
  public totalQuantity: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogSaleComponent>,
    public apiSale: ApiSaleService,
    public snackBar: MatSnackBar,
    private apiProduct: ApiProductService, 
    private apiClient: ApiClientService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public Sale: Sale
  ){
    if(this.Sale !== null){
      this.mergeInfo();
    }
  }

  mergeInfo(){
    let saleConfirmTmp: ProductSaleConfirm[] = [];

    for(let i = 0; i < this.Sale.productSale.length; i++){
      this.apiProduct.getProduct(this.Sale.productSale[i].companyId, this.Sale.productSale[i].productId).subscribe(response => {
        response.map((p) => {
          let productsListTmp = {
            productSaleId: 0,
            productName: p.productName,
            saleId: 0,
            productId: this.Sale.productSale[i].productId,
            quantity: this.Sale.productSale[i].quantity,
            unitPrice: this.Sale.productSale[i].unitPrice,
            companyId: this.Sale.productSale[i].companyId
          };

          saleConfirmTmp.push(productsListTmp);
        });
      });
    }

    this.apiClient.getClients(this.Sale.companyId).subscribe(response => {
      response.map((p) => {
        if(p.clientId == this.Sale.clientId){
          this.saleConfirm = {
            saleId: 0,
            clientId: this.Sale.clientId,
            clientName: p.clientName.concat(' ', p.surname),
            total: this.Sale.total,
            companyId: this.Sale.companyId,
            productSale: saleConfirmTmp
          }
        }
      });
    });

    for(let i = 0; i < this.Sale.productSale.length; i++){
      this.totalQuantity += this.Sale.productSale[i].quantity;
    }
  }

  close(){
    this.dialogRef.close();
  }

  saveSale(){
    this.spinner.show();
    this.apiSale.postSale(this.Sale).subscribe(response => {
      if(response){
        this.close();
        // this.spinner.hide();
        // window.location.reload();
      }
    });
  }
}
