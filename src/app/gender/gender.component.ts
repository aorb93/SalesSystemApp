import { Component, OnInit } from '@angular/core';
import { ApiGenderService } from '../services/api-gender.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gender } from '../models/gender';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { faEdit, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss'
})
export class GenderComponent implements OnInit {

  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public lstGender: Gender[] = [];

  public gender: number = 1;

  public faEdit = faEdit;
  public faTrash = faTrash;
  public faSquareCheck = faSquareCheck

  constructor(
      private apiGender: ApiGenderService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar
    ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
      this.companyId = this.userSubject.value.infoUser.companyId;
    }

  ngOnInit(): void {
    this.getGender(this.companyId);
  }

  getGender(companyId: number){
    this.apiGender.getGender(companyId).subscribe(response => {
      this.lstGender = response;
    });
  }

  openAdd(){
    // const dialogRef = this.dialog.open(dialogCategoryComponent, {
    //   width: this.width
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getCategory();
    // });
  }

  openEdit(gender: Gender){
  //   const dialogRef = this.dialog.open(dialogCategoryComponent, {
  //     width: this.width,
  //     data: category
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getCategory();
  //   });
  // }

  // delete(category: Category){
  //   const dialogRef = this.dialog.open(DialogDeleteComponente, {
  //     width: this.width
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result){
  //       this.apiCategory.deleteCategories(category.categoryId).subscribe(response => {
  //         if(response){
  //           this.snackBar.open('Categoria eliminada con exito', '', {
  //             duration: 2000
  //           })
  //           this.getCategory();
  //         }
  //       });
  //     }
  //   });
  }
  delete(gender: Gender){

  }
}
