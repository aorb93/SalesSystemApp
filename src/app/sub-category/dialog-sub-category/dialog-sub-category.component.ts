import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { subCategory, SubCategory } from '../../models/subCategory';
import { ApiSubCategoryService } from '../../services/api-sub-category.service';
import { Gender, Select2Gender } from '../../models/gender';
import { ApiGenderService } from '../../services/api-gender.service';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-dialog-sub-category',
  templateUrl: './dialog-sub-category.component.html',
  styleUrl: './dialog-sub-category.component.scss'
})
export class DialogSubCategoryComponent {
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public subCategoryName!: string;
  public genderId!: number;

  public lstGender!: Gender[];
  public GenderSelect2!: Select2Data;
    public selectGenderId: string = '0';

  constructor(
    public dialogRef: MatDialogRef<DialogSubCategoryComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private apiSubCategory: ApiSubCategoryService,
    private apiGender: ApiGenderService,
    @Inject(MAT_DIALOG_DATA) public subCategory: subCategory
  ){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
    this.companyId = this.userSubject.value.infoUser.companyId;
  }

  ngAfterContentInit(): void{
    if(this.subCategory !== null){
      this.subCategoryName = this.subCategory.subCategoryName;
    }
  }

  ngOnInit(): void {
    this.getGender(this.companyId);
    this.spinner.hide();
  }

  close(){
    this.dialogRef.close();
  }

  // #region SelectGender
  getGender(companyId: number){
    this.apiGender.getGender(companyId).subscribe(
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
    if(this.subCategory !== null){
      this.selectGenderId = this.subCategory.genderId.toString();
      // this.loadGender = true;
      // this.loaDone();
    }
  }

  selectGenderOpt(event: any){
    this.selectGenderId = event.value;
  }
  // #endregion
  
  addSubCategory() {
    this.spinner.show();

    let tmpSubCategory: subCategory = {
      subCategoryId: 0,
      subCategoryName: this.subCategoryName,
      categoryId: Number(this.subCategory),
      genderId: Number(this.selectGenderId),
      companyId: this.companyId
    }

    this.apiSubCategory.postSubCategory(tmpSubCategory).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpSubCategory.subCategoryName + ' agregada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
  
  editSubCategory() {
    this.spinner.show();

    let tmpSubCategory: subCategory = {
      subCategoryId: this.subCategory.subCategoryId,
      subCategoryName: this.subCategoryName,
      categoryId: this.subCategory.categoryId,
      genderId: Number(this.selectGenderId),
      companyId: this.companyId
    }

    this.apiSubCategory.putSubCategory(tmpSubCategory).subscribe(response => {
      if(response){
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.open('Talla ' + tmpSubCategory.subCategoryName + ' editada', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
      }
    }); 
  }
}
