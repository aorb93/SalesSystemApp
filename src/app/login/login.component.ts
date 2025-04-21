import { Component, OnInit } from "@angular/core";
import { apiAuthService } from "../services/apiAuth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({ 
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

    public loginForm!: FormGroup;
    public errorMessage!: string;
    public showMessage: boolean = false;

    // public loginForm = this.formBuilder.group({
    //     userLogin: ['', Validators.required],
    //     password: ['', Validators.required]
    // });
    // public loginForm = new FormGroup({
    //     userLogin: new FormControl(''),
    //     password: new FormControl('')
    // });
    
    constructor(public apiAuthService: apiAuthService, private router: Router, private formBuilder: FormBuilder, private spinner: NgxSpinnerService){
        if(this.apiAuthService.userData){
            this.router.navigate(['/']);
        }
        spinner.show();
    }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userLogin: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.spinner.hide();
    }

    login(){
        this.showMessage = false;
        this.spinner.show();
        this.apiAuthService.login(this.loginForm.value).subscribe(response => {
            if(response.result){
                this.router.navigate(['/']);
            }
        },
        (error) => {
            if(Number(error.status) == 401) {
                this.errorMessage = "Usuario o contraseña incorrecto, intente de nuevo";
                this.showMessage = true;
            }
            this.spinner.hide();
        });
    }
}