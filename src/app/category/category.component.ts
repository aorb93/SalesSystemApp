import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../services/api-category.service';
import { Response } from '../models/response';
import { dialogCategoryComponent } from './dialog/dialogCategory.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../models/category';
import { DialogDeleteComponente } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  public lstCategory!: Response[];
  public columns: string[] = ['categoryId', 'categoryName', 'enable', 'actions']
  readonly width: string = '300px';
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  constructor(
    private apiCategory: ApiCategoryService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(){
    this.apiCategory.getCategories().subscribe(response => {
      this.lstCategory = response;
    });
  }

  openAdd(){
    const dialogRef = this.dialog.open(dialogCategoryComponent, {
      width: this.width
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }

  openEdit(category: Category){
    const dialogRef = this.dialog.open(dialogCategoryComponent, {
      width: this.width,
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }

  delete(category: Category){
    const dialogRef = this.dialog.open(DialogDeleteComponente, {
      width: this.width
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiCategory.deleteCategories(category.categoryId).subscribe(response => {
          if(response){
            this.snackBar.open('Categoria eliminada con exito', '', {
              duration: 2000
            })
            this.getCategory();
          }
        });
      }
    });
  }
}