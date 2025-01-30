import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiProductService } from "../../services/api-product.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product, insProduct } from "../../models/product";
import { Select2Category } from '../../models/category';
import { SubCategory, Select2SubCategory } from '../../models/subCategory';
import { Response } from '../../models/response';
import { ApiCategoryService } from '../../services/api-category.service';
import { Select2Data, Select2Option } from 'ng-select2-component';
import { ApiSubCategoryService } from "../../services/api-sub-category.service";
import { ApiGenderService } from "../../services/api-gender.service";
import { Gender, Select2Gender } from "../../models/gender";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import $ from "jquery";

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss'
})
export class DialogProductComponent implements OnInit{
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public nameProduct!: string;
  public productQuantity!: number;
  public productCost!: number;
  public productPrice!: number;
  public response!: Response[];
  public lstCategory!: Response[];
  public lstSubCategory!: SubCategory[];
  public lstGender!: Gender[];

  public GenderSelect2!: Select2Data;
  public selectGenderId: string = '0';

  public CategorySelect2!: Select2Data;
  public selectCategoryId: string = '0';

  public SubCategorySelect2!: Select2Data;
  public selectSubCategoryId: string = '0';
  public subCategoryDisabled = true;

  public loadGender: boolean = false;
  public loadCategory: boolean = false;
  public loadSubCategory: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<DialogProductComponent>,
      public apiProduct: ApiProductService,
      public snackBar: MatSnackBar,
      private apiCategory: ApiCategoryService,
      private apiSubCategory: ApiSubCategoryService,
      private apiGender: ApiGenderService,
      private spinner: NgxSpinnerService,
      @Inject(MAT_DIALOG_DATA) public product: Product
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;

    if(this.product !== null){
      this.getSubCategory(this.product.categoryId, this.product.genderId);
    }
  }

  ngAfterContentInit(): void{
    if(this.product !== null){
      this.subCategoryDisabled = false;
      this.nameProduct = this.product.productName;
      this.productQuantity = this.product.quantity;
      this.productCost = this.product.cost;
      this.productPrice = this.product.price;
    }
  }

  ngOnInit(): void {
    this.getCategory();
    this.getGender();
  }

  close(){
    this.dialogRef.close();
  }

  loaDone(){
    if(this.loadGender && this.loadCategory && this.loadSubCategory){
      this.spinner.hide();
    }
  }

  getGender(){
    this.apiGender.getGender().subscribe(
      response => {
        this.lstGender = response;
        this.getSelect2Gender(this.lstGender);
      }
    );
  }

  getSelect2Gender(selectGender: Gender[]){
    let tmpData: Select2Gender[] = [];

    for(let i = 0; i < selectGender.length; i++){
      let tmpData2 = {
        value: selectGender[i].genderId.toString(),
        label: selectGender[i].genderName,
        disabled: false
      };
      
      tmpData.push(tmpData2);
    }

    this.GenderSelect2 = JSON.parse(JSON.stringify(tmpData));
    if(this.product !== null){
      this.selectGenderId = this.product.genderId.toString();
      this.loadGender = true;
      this.loaDone();
    }
  }

  selectGenderOpt(event: any){
    this.selectGenderId = event.value;
    this.getSubCategory(Number(this.selectCategoryId), Number(this.selectGenderId));
  }

  getCategory(){
    this.apiCategory.getSelectCategory().subscribe(response => {
      this.lstCategory = response;
      this.getSelect2Category(this.lstCategory);
    });
  }

  getSelect2Category(selectClient: Response[]){
    let tmpData: Select2Category[] = [];

    for(let i = 0; i < selectClient.length; i++){
      let tmpData2 = {
        value: selectClient[i].categoryId.toString(),
        label: selectClient[i].categoryName,
        disabled: false
      };
      
      tmpData.push(tmpData2);
    }

    this.CategorySelect2 = JSON.parse(JSON.stringify(tmpData));
    if(this.product !== null){
      this.selectCategoryId = this.product.categoryId.toString();
      this.loadCategory = true;
      this.loaDone();
    }
  }

  selectCategoryOpt(event: any){
    this.selectCategoryId = event.value;
    this.getSubCategory(Number(this.selectCategoryId), Number(this.selectGenderId));
  }

  async getSubCategory(selectCategoryId: number, selectGenderId: number){
    await this.apiSubCategory.getSubCategories(selectCategoryId, selectGenderId).subscribe(response => {
      this.lstSubCategory = response;
      this.getSelect2SubCategory(this.lstSubCategory);
    });
  }

  getSelect2SubCategory(selectSubCategory: SubCategory[]){
    if(selectSubCategory.length > 0){
      let tmpData: Select2SubCategory[] = [];

      for(let i = 0; i < selectSubCategory.length; i++){
        let tmpData2 = {
          value: selectSubCategory[i].subCategoryId.toString(),
          label: selectSubCategory[i].subCategoryName,
          disabled: false
        };
        
        tmpData.push(tmpData2);
      }

      this.SubCategorySelect2 = JSON.parse(JSON.stringify(tmpData));
      this.subCategoryDisabled = false;
      if(this.product !== null){
        this.selectSubCategoryId = this.product.subCategoryId.toString();
        this.loadSubCategory = true;
        this.loaDone();
      }
    }else{
      this.subCategoryDisabled = true;
    }
  }

  selectSubCategoryOpt(event: any){
    this.selectSubCategoryId = event.value;
  }

  addProduct(){
    this.spinner.show();

    let tmpProduct: insProduct = {
      productId: 0,
      productName: this.nameProduct,
      quantity: this.productQuantity,
      cost: this.productCost,
      price: this.productPrice,
      brandId: 1,
      genderId: Number(this.selectGenderId),
      seasonId: 1,
      categoryId: Number(this.selectCategoryId),
      subCategoryId: Number(this.selectSubCategoryId),
      colorId: 11,
      sizeId: 5,
      companyId: this.companyId
    }

    this.apiProduct.postProduct(tmpProduct).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Producto ' + tmpProduct.productName + ' agregado', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    });
  }

  editProduct(){
    this.spinner.show();

    let tmpProduct: insProduct = {
      productId: this.product.productId,
      productName: this.nameProduct,
      quantity: this.productQuantity,
      cost: this.productCost,
      price: this.productPrice,
      brandId: 1,
      genderId: Number(this.selectGenderId),
      seasonId: 1,
      categoryId: Number(this.selectCategoryId),
      subCategoryId: Number(this.selectSubCategoryId),
      colorId: 11,
      sizeId: 5,
      companyId: this.companyId
    }

    this.apiProduct.putProduct(tmpProduct).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Producto ' + tmpProduct.productName + ' editado', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
      }
    });
  }
}
