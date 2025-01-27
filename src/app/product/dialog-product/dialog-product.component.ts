import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiProductService } from "../../services/api-product.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "../../models/product";
import { Select2Category } from '../../models/category';
import { Select2SubCategory } from '../../models/subCategory';
import { Response } from '../../models/response';
import { ApiCategoryService } from '../../services/api-category.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss'
})
export class DialogProductComponent {
  public nameProduct!: string;
  public response!: Response[];
  public lstCategory!: Response[];

  public CategorySelect2!: Select2Data;
  public categoryId!: number;
  public selectCategoryId!: number;

  constructor(
      public dialogRef: MatDialogRef<DialogProductComponent>,
      public apiProduct: ApiProductService,
      public snackBar: MatSnackBar,
      private apiCategory: ApiCategoryService,
      @Inject(MAT_DIALOG_DATA) public product: Product
  ){
      if(this.product !== null){
          this.nameProduct = product.productName
      }
  }

  ngOnInit(): void {
    this.getCategory();
    
  }

  close(){
    this.dialogRef.close();
  }

  editProduct(){
  }

  addProduct(){
  }

  getCategory(){
    this.apiCategory.getSelectCategory().subscribe(response => {
      this.lstCategory = response;
      this.getSelect2Client(this.lstCategory);
    });
  }

  getSelect2Client(selectClient: Response[]){
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
  }

}
