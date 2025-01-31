import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: 'dialogdelete.component.html'
})
export class DialogDeleteComponente{

    constructor(
        public dialogRef: MatDialogRef<DialogDeleteComponente>, 
        @Inject(MAT_DIALOG_DATA) public textDialog: string
    ){

    }
}