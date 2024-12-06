import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiCategoryService } from "../../services/api-category.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Category } from "../../models/category";

@Component({
    templateUrl: 'dialogCategory.component.html'
})

export class dialogCategoryComponent{
    public nameCategory!: string;
    public response!: Response[];

    constructor(
        public dialogRef: MatDialogRef<dialogCategoryComponent>,
        public apiCategory: ApiCategoryService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public category: Category
    ){
        if(this.category !== null){
            this.nameCategory = category.categoryName
        }
    }

    close(){
        this.dialogRef.close();
    }

    editCategory(){
        const category: Category = { categoryName: this.nameCategory, categoryId: this.category.categoryId };
        this.apiCategory.editCategories(category).subscribe(response => {
            if(response){
                this.dialogRef.close();
                this.snackBar.open('Categoría editada', '', {
                    duration: 2000
                });
            }
        });
    }

    addCategory(){
        const category: Category = { categoryName: this.nameCategory, categoryId: 0 };
        this.apiCategory.postCategories(category).subscribe(response => {
            if(response){
                this.dialogRef.close();
                this.snackBar.open('Categoría agregada', '', {
                    duration: 2000
                });
            }
        });
    }


}