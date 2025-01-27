import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiProductService } from "../../services/api-product.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "../../models/product";
import { Select2Category } from '../../models/category';
import { SubCategory, Select2SubCategory } from '../../models/subCategory';
import { Response } from '../../models/response';
import { ApiCategoryService } from '../../services/api-category.service';
import { Select2Data } from 'ng-select2-component';
import { ApiSubCategoryService } from "../../services/api-sub-category.service";
import { ApiGenderService } from "../../services/api-gender.service";
import { Gender, Select2Gender } from "../../models/gender";

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss'
})
export class DialogProductComponent {
  public nameProduct!: string;
  public response!: Response[];
  public lstCategory!: Response[];
  public lstSubCategory!: SubCategory[];
  public lstGender!: Gender[];

  public GenderSelect2!: Select2Data;
  public genderId!: number;
  public selectGenderId: number = 0;

  public CategorySelect2!: Select2Data;
  public categoryId!: number;
  public selectCategoryId: number = 0;

  public SubCategorySelect2!: Select2Data;
  public subCategoryId!: number;
  public selectSubCategoryId!: number;
  public subCategoryDisabled = true;

  constructor(
      public dialogRef: MatDialogRef<DialogProductComponent>,
      public apiProduct: ApiProductService,
      public snackBar: MatSnackBar,
      private apiCategory: ApiCategoryService,
      private apiSubCategory: ApiSubCategoryService,
      private apiGender: ApiGenderService,
      @Inject(MAT_DIALOG_DATA) public product: Product
  ){
      if(this.product !== null){
          this.nameProduct = product.productName
      }
  }

  ngOnInit(): void {
    this.getCategory();
    this.getGender();
  }

  close(){
    this.dialogRef.close();
  }

  editProduct(){
  }

  addProduct(){
  }

  getGender(){
    this.apiGender.getGender().subscribe(response => {
      this.lstGender = response;
      this.getSelect2Gender(this.lstGender);
    });
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
  }

  selectGenderOpt(event: any){
    this.selectGenderId = event.value;
    this.getSubCategory(this.selectCategoryId, this.selectGenderId);
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
  }

  selectCategoryOpt(event: any){
    this.selectCategoryId = event.value;
    this.getSubCategory(this.selectCategoryId, this.selectGenderId);
  }

  getSubCategory(selectCategoryId: number, selectGenderId: number){
    this.apiSubCategory.getSubCategories(selectCategoryId, selectGenderId).subscribe(response => {
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
    }else{
      this.subCategoryDisabled = true;
    }
  }

  selectSubCategoryOpt(event: any){
    this.selectCategoryId = event.value;
  }

}
