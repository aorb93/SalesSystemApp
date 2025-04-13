import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiGenderService } from "../../services/api-gender.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Gender } from "../../models/gender";
import { User } from "../../models/user";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-dialog-gender',
  templateUrl: './dialog-gender.component.html',
  styleUrl: './dialog-gender.component.scss'
})

export class DialogGenderComponent {
  public userSubject!: BehaviorSubject<User>;
  public companyId!: number;

  public nameGender!: string;
  public response!: Response[];

  constructor(
      public dialogRef: MatDialogRef<DialogGenderComponent>,
      public apiGender: ApiGenderService,
      public snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public gender: Gender
  ){
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')!));
      this.companyId = this.userSubject.value.infoUser.companyId;

      if(this.gender !== null){
          this.nameGender = gender.genderName;
      }
  }

  close(){
    this.dialogRef.close();
  }

  editGender(){
    const category: Gender = { 
      genderName: this.nameGender, 
      genderId: this.gender.genderId,
      companyId: this.companyId
    };
    this.apiGender.editGender(category).subscribe(response => {
      if(response){
        this.dialogRef.close();
        this.snackBar.open('Género editado', '', {
            duration: 2000
        });
      }
    });
  }

  addGender(){
    const category: Gender = { 
      genderName: this.nameGender, 
      genderId: 0,
      companyId: this.companyId
    };
    this.apiGender.postGender(category).subscribe(response => {
      if(response){
        this.dialogRef.close();
        this.snackBar.open('Género agregado', '', {
          duration: 2000
        });
      }
    });
  }
}
