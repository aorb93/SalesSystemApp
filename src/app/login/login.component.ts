import { Component, OnInit } from "@angular/core";
import { apiAuthService } from "../services/apiAuth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

    public loginForm!: FormGroup;

    // public loginForm = this.formBuilder.group({
    //     userLogin: ['', Validators.required],
    //     password: ['', Validators.required]
    // });
    // public loginForm = new FormGroup({
    //     userLogin: new FormControl(''),
    //     password: new FormControl('')
    // });
    
    constructor(public apiAuthService: apiAuthService, private router: Router, private formBuilder: FormBuilder){
        // if(this.apiAuthService.userData){
        //     this.router.navigate(['/']);
        // }
    }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userLogin: ['', Validators.required],
        password: ['', Validators.required]
        });
    }

    login(){
        // this.spinner.spinnerShow = true;
        this.apiAuthService.login(this.loginForm.value).subscribe(response => {
            if(response.result){
                this.router.navigate(['/']);
                // this.spinner.spinnerShow = false;
            }
        })
    }
}