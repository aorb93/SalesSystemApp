import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgOptimizedImage } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { dialogCategoryComponent } from './category/dialog/dialogCategory.component';
import { DialogDeleteComponente } from './common/delete/dialogdelete.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { SaleComponent } from './sale/sale.component';
import { ProductComponent } from './product/product.component';
import { MatTable } from '@angular/material/table';
import { ClientComponent } from './client/client.component';
import { DialogSaleComponent } from './sale/dialog-sale/dialog-sale.component';
import { SalesComponent } from './sales/sales.component';
import { DialogSalesComponent } from './sales/dialog-sales/dialog-sales.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { Select2Module } from 'ng-select2-component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogProductComponent } from './product/dialog-product/dialog-product.component';
import { DialogClientComponent } from './client/dialog-client/dialog-client.component';
import { BrandComponent } from './brand/brand.component';
import { DialogBrandComponent } from './brand/dialog-brand/dialog-brand.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SaledetailComponent } from './saledetail/saledetail.component';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { GenderComponent } from './gender/gender.component';
import { CollectComponent } from './collect/collect.component';
import { CollectWeekComponent } from './collect-week/collect-week.component';
import { CollectNextThreeDaysComponent } from './collect-next-three-days/collect-next-three-days.component';
import { DialogGenderComponent } from './gender/dialog-gender/dialog-gender.component';
import { SizeComponent } from './size/size.component';
import { DialogSizeComponent } from './size/dialog-size/dialog-size.component';
import { SeasonComponent } from './season/season.component';
import { DialogSeasonComponent } from './season/dialog-season/dialog-season.component';
import { ColorComponent } from './color/color.component';
import { DialogColorComponent } from './color/dialog-color/dialog-color.component';
import { PeriodComponent } from './period/period.component';
import { DialogPeriodComponent } from './period/dialog-period/dialog-period.component';
registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    dialogCategoryComponent,
    DialogDeleteComponente,
    LoginComponent,
    SaleComponent,
    ProductComponent,
    ClientComponent,
    DialogSaleComponent,
    SalesComponent,
    DialogSalesComponent,
    StatisticsComponent,
    DialogProductComponent,
    DialogClientComponent,
    BrandComponent,
    DialogBrandComponent,
    SaledetailComponent,
    CatalogsComponent,
    GenderComponent,
    CollectComponent,
    CollectWeekComponent,
    CollectNextThreeDaysComponent,
    DialogGenderComponent,
    SizeComponent,
    DialogSizeComponent,
    SeasonComponent,
    DialogSeasonComponent,
    ColorComponent,
    DialogColorComponent,
    PeriodComponent,
    DialogPeriodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTable,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatButtonToggleModule,
    NgOptimizedImage,
    Select2Module,
    FontAwesomeModule,
    NgxPaginationModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: LOCALE_ID, useValue: 'es-MX' },
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
