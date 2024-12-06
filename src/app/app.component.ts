import { Component } from '@angular/core';
import { User } from './models/user';
import { apiAuthService } from './services/apiAuth.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SpinnerComponent } from './common/spinner/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent {
  title = 'SalesSystemApp';
  user!: User;

  public pageTitle!: string;

  constructor(public apiAuthService: apiAuthService, private router: Router, public spinner: SpinnerComponent){
    this.apiAuthService.user.subscribe(res => {
      this.user = res;
    })

    this.spinner.spinnerShow = true;
  }

  setInfo(pageTitle: string){
    this.pageTitle = pageTitle;
  }

  logout(){
    this.apiAuthService.logout();
    this.router.navigate(['/login']);
  }
}
