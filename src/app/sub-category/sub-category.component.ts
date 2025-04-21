import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from '../app.component';
import { subCategory, SubCategory } from '../models/subCategory';
import { ApiSubCategoryService } from '../services/api-sub-category.service';
import { DialogSubCategoryComponent } from './dialog-sub-category/dialog-sub-category.component';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { ApiCategoryService } from '../services/api-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent {
  public data: any;
  public categoryId!: number;
  public companyId!: number;

  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  public lstCategory!: Category[];
  public lstSubCategory!: SubCategory[];
  public _isMobile!: boolean;

  public width: string = '500px';
  public height: string = '500px';
  
  constructor(
      private router: Router, 
      private apiSubCategory: ApiSubCategoryService, 
      public dialog: MatDialog,
      private apiCategory: ApiCategoryService,
      public snackBar: MatSnackBar, 
      private spinner: NgxSpinnerService, 
      private isMobile: AppComponent
  ) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
    this.categoryId = this.data.someData.name;
    this.companyId = this.data.someData.description;
  }

  ngOnInit(): void {
    this.spinner.show();
    this._isMobile = this.isMobile.isMobile;
    this.getCategory(this.categoryId, this.companyId)
    this.getSubCategory(this.companyId);
  }

  getCategory(categoryId: number, companyId: number){
    this.apiCategory.getCategory(categoryId, companyId).subscribe(response => {
      this.lstCategory = response;
    });
  }

  getSubCategory(companyId: number) {
    this.apiSubCategory.getSubCategory(this.categoryId, companyId).subscribe(response => {
      this.lstSubCategory = response;
      this.spinner.hide();
    });
  }

  openAdd(categoryId: number){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .70).toString() + 'px';
    
    const dialogRef = this.dialog.open(DialogSubCategoryComponent, {
      width: this.width,
      height: this.height,
      data: categoryId,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubCategory(this.companyId);
    });
  }

  openEdit(subCategory: SubCategory){
    this.spinner.show();
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .70).toString() + 'px';

    const dialogRef = this.dialog.open(DialogSubCategoryComponent, {
      width: this.width,
      height: this.height,
      data: subCategory,
      autoFocus: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getSubCategory(this.companyId);
    });
  }
  
  delete(subCategory: SubCategory){
    this.width = (window.innerWidth * .85).toString() + 'px';
    this.height = (window.innerHeight * .25).toString() + 'px';

    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width,
      height: this.height,
      data: 'SubCategoría ' + subCategory.subCategoryName
    });

    let tmpSubCategory: subCategory = {
      subCategoryId: subCategory.subCategoryId,
      subCategoryName: '',
      genderId: 0,
      categoryId: subCategory.categoryId,
      companyId: this.companyId
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiSubCategory.delSubCategory(tmpSubCategory).subscribe(response => {
          if(response){
            this.snackBar.open('SubCategoría ' + subCategory.subCategoryName + ' eliminada con exito', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.getSubCategory(this.companyId);
          }
        });
      }
    });
  }
}
