import { Component, ViewChild } from '@angular/core';
import { User } from './models/user';
import { apiAuthService } from './services/apiAuth.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxSpinnerService } from 'ngx-spinner';
import { faUsers, faHome, faChartBar, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent {
  title = 'SalesSystemApp';
  public user!: User;

  public txtYear = '';

  public pageTitle!: string;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  public faUsers = faUsers;
  public faHome = faHome;
  public faChartBar = faChartBar;
  public faArrowRightFromBracket = faArrowRightFromBracket;
  public faBars = faBars;

  constructor(
    public apiAuthService: apiAuthService, 
    private router: Router,
    private observer: BreakpointObserver,
    private spinner: NgxSpinnerService){
    

    this.txtYear =  ' ' + new Date().getFullYear().toString();
  }

  ngAfterContentInit(): void{
    this.apiAuthService.user.subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  setInfo(pageTitle: string){
    this.pageTitle = pageTitle;
  }

  logout(){
    this.apiAuthService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  clickButon(val: string){
    if (val !== this.router.url) {
      this.spinner.show();
    }
  }
}
