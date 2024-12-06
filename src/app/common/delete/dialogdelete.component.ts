import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: 'dialogdelete.component.html'
})
export class DialogDeleteComponente{
    constructor(public dialogRef: MatDialogRef<DialogDeleteComponente>){

    }
}