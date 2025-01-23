import { Component, ViewChild } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { MatOptionModule } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Product, Select2Product } from '../models/product';
import { ApiProductService } from '../services/api-product.service';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiClientService } from '../services/api-client.service';
import { Client, Select2Client } from '../models/client';
import { Sale } from '../models/sale';
import { ProductSale } from '../models/sale';
import { ApiSaleService } from '../services/api-sale.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DialogSaleComponent } from './dialog-sale/dialog-sale.component';
import { MatDialog } from '@angular/material/dialog';
import { Select2Module, Select2Data, Select2SelectionOverride } from 'ng-select2-component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  
  public productSelect!: string;
  public product!: ProductComponent;

  public selectProduct!: any[]; //Product[];
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;
  public productId!: number;

  public selectProductId!: number;

  public addSelectProduct: Product[] = [];
  public columns: string[] = ['productId', 'productName', 'price', 'quantity'];
  public total: number = 0;
  public showTable!: boolean;

  public clientSelect!: string;
  public selectClient!: Client[];
  public selectClientId!: number;
  public clientId!: number;

  public saleInfo!: Sale;
  public saleDetail!: ProductSale;
  public isChecked: boolean = false;
  public toggleChanged!: boolean;

  public width: string = '500px';

  public ClientSelect2!: Select2Data;
  public ProductSelect2!: Select2Data;
  
  @ViewChild(MatTable) table!: MatTable<Product>;

  constructor(
    private apiProduct: ApiProductService, 
    private apiClient: ApiClientService, 
    private apiSale: ApiSaleService, 
    public option: MatOptionModule, 
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
    this.showTable = true;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getProduct(this.companyId);
    this.getClients(this.companyId);
    this.spinner.hide();
  }
  
  getProduct(companyId: number) {
    this.apiProduct.getProducts(companyId).subscribe(response => {
      this.selectProduct = response;
      this.disabledButtonAdd(true);
      this.disabledButtonSale();
      this.getProduct2Client(this.selectProduct);
    });
  }

  getProduct2Client(selectProduct: Product[]){
    let tmpData: Select2Product[] = [];

    for(let i = 0; i < selectProduct.length; i++){
      let tmpData2 = {
        value: selectProduct[i].productId.toString(),
        label: selectProduct[i].productName,
        disabled: false
      };
      
      tmpData.push(tmpData2);
    }

    this.ProductSelect2 = JSON.parse(JSON.stringify(tmpData));
  }

  selectProductOpt(event: any){
    this.disabledButtonAdd(false);
    this.selectProductId = event.value;

    this.ProductSelect2.map((dato) =>{
      if(dato.data === Number(this.selectProductId)){
        console.log("w")
      }
      
      return dato;
    });
    
  }

  addProduct(){
    if(this.selectProductId !== 0 && this.selectProductId !== undefined){
      this.spinner.show();
      if(this.addProductDuplicate(this.selectProductId)){
        this.apiProduct.getProduct(this.companyId, this.selectProductId).subscribe(response => {
          response[0].quantitySale = 1;
          response[0].iconRemove = 'delete';
          response[0].iconColor = 'text-danger'
          this.addSelectProduct.push(response[0]);
          this.table.renderRows();
          this.productSelect = '';
          this.getTotal();
          this.disabledButtonAdd(true);
        });
      }
    }
  }

  addProductDuplicate(id: number){
    let add: boolean = false;
    if(this.addSelectProduct.length > 0){
      this.addSelectProduct.map(function(p){
        if(p.productId == id){
          p.quantitySale++;
          p.iconRemove = p.quantitySale > 1 ? 'remove' : 'delete'
          p.iconColor = p.quantitySale > 1 ? 'text-warning' : 'text-danger'
          add = false;
        }
        else{
          add = true;
        }
      });
    }
    else{
      add = true;
    }
    this.table.renderRows();
    this.productSelect = '';
    this.getTotal();
    return add;
  }

  selectClientOpt(event: any){
    this.selectClientId = event.value;
  }

  getTotal(){
    this.total = 0;
    for(let i = 0; i < this.addSelectProduct.length; i++){
      this.total += (this.addSelectProduct[i].price * this.addSelectProduct[i].quantitySale);
    }
    this.disabledButtonSale();
    this.spinner.hide();
  }

  subtract(id: number){
    let idDelete: number = 0;
    this.addSelectProduct.map(function(p){
      if(p.productId == id){
        p.quantitySale--;
        p.iconRemove = p.quantitySale > 1 ? 'remove' : 'delete'
        p.iconColor = p.quantitySale > 1 ? 'text-warning' : 'text-danger'
        if(p.quantitySale === 0){
          idDelete = p.productId;
        }
      }
    });
    if(idDelete > 0){
      this.delete(idDelete);
    }
    this.table.renderRows();
    this.getTotal();
  }

  delete(id: number){
    let borrar = -1;
    
    this.addSelectProduct.forEach((item, index) => {
      if(item.productId == id) {
          borrar = index;
      }
    });
    if(borrar >= 0) {
      this.addSelectProduct.splice(borrar, 1);
    }
  }

  add(id: number){
    this.addSelectProduct.map(function(p){
      if(p.productId == id && p.quantitySale < p.quantity){
        p.quantitySale++;
        p.iconRemove = p.quantitySale > 1 ? 'remove' : 'delete'
        p.iconColor = p.quantitySale > 1 ? 'text-warning' : 'text-danger'
      }
    });
    this.table.renderRows();
    this.getTotal();
  }

  cleanTable(){
    this.addSelectProduct = [];
    this.table.renderRows();
    this.productSelect = '';
    // this.showTableDisplay();
    this.getTotal();
  }

  showTableDisplay(){
    this.showTable = this.addSelectProduct.length > 0 ? true : false;
  }

  getClients(companyId: number) {
    this.apiClient.getClients(companyId).subscribe(response => {
      this.selectClient = response;
      this.getSelect2Client(this.selectClient);
    });
  }

  getSelect2Client(selectClient: Client[]){
    let tmpData: Select2Client[] = [];

    for(let i = 0; i < selectClient.length; i++){
      let tmpData2 = {
        value: selectClient[i].clientId.toString(),
        label: selectClient[i].clientName
      };
      
      tmpData.push(tmpData2);
    }

    this.ClientSelect2 = JSON.parse(JSON.stringify(tmpData));
  }

  sale(){
    if(this.addSelectProduct.length > 0){
      this.spinner.show();

      let productsList: ProductSale[] = [];

      for(let i = 0; i < this.addSelectProduct.length; i++){
        let productsListTmp = {
          productSaleId: 0,
          saleId: 0,
          productId: this.addSelectProduct[i].productId,
          quantity: this.addSelectProduct[i].quantitySale,
          unitPrice: this.addSelectProduct[i].price,
          companyId: this.companyId
        };

        productsList.push(productsListTmp);
      }

      this.saleInfo = {
        saleId: 0,
        clientId: this.selectClientId,
        total: this.total,
        companyId: this.companyId,
        productSale: productsList
      }

      this.spinner.show();
      this.openAdd(this.saleInfo);
    }
  }

  disabledButtonAdd(disabled: boolean){
    var addButton = <HTMLInputElement> document.getElementById("addButton");
    addButton.disabled = disabled ? true : false;
  }

  disabledButtonSale(){
    var saleButton = <HTMLInputElement> document.getElementById("saleButton");
    var cleanButton = <HTMLInputElement> document.getElementById("cleanButton");
    saleButton.disabled = this.addSelectProduct.length === 0 ? true : false;
    cleanButton.disabled = this.addSelectProduct.length === 0 ? true : false;
  }

  onChange(group: any) {
      group.value = "";
  }

  colorIconSubtract(){
    var iconSubtract = <HTMLInputElement> document.getElementById("iconSubtract");
    iconSubtract.disabled = this.addSelectProduct.length === 0 ? true : false;
  }

  openAdd(saleData: Sale){
    this.width = (window.innerWidth * .85).toString() + 'px';
    
    const dialogRef = this.dialog.open(DialogSaleComponent, {
      width: this.width,
      data: saleData
    });
    this.spinner.hide();

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
