import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiCategoryService } from "../../services/api-category.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Category } from "../../models/category";
import { User } from "../../models/user";
import { BehaviorSubject } from "rxjs";

@Component({
    templateUrl: 'dialogCategory.component.html'
})

export class dialogCategoryComponent{
    
    public userSubject!: BehaviorSubject<User>;
    public companyId!: number;

    public nameCategory!: string;
    public response!: Response[];

    constructor(
        public dialogRef: MatDialogRef<dialogCategoryComponent>,
        public apiCategory: ApiCategoryService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public category: Category
    ){
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
        this.companyId = this.userSubject.value.infoUser.companyId;

        if(this.category !== null){
            this.nameCategory = category.categoryName
        }
    }

    close(){
        this.dialogRef.close();
    }

    editCategory(){
        const category: Category = { 
            categoryName: this.nameCategory, 
            categoryId: this.category.categoryId,
            companyId: this.companyId
        };
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
        const category: Category = { 
            categoryName: this.nameCategory, 
            categoryId: 0,
            companyId: this.companyId
        };
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