import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';
import { SalesComponent } from './sales/sales.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ClientComponent } from './client/client.component';
import { BrandComponent } from './brand/brand.component';
import { SaledetailComponent } from './saledetail/saledetail.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { GenderComponent } from './gender/gender.component';
import { CollectComponent } from './collect/collect.component';
import { CollectWeekComponent } from './collect-week/collect-week.component';
import { CollectNextThreeDaysComponent } from './collect-next-three-days/collect-next-three-days.component';
import { SizeComponent } from './size/size.component';
import { SeasonComponent } from './season/season.component';
import { ColorComponent } from './color/color.component';
import { PeriodComponent } from './period/period.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'sale', component: SaleComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'brand', component: BrandComponent, canActivate: [AuthGuard] },
  { path: 'size', component: SizeComponent, canActivate: [AuthGuard] },
  { path: 'season', component: SeasonComponent, canActivate: [AuthGuard] },
  { path: 'color', component: ColorComponent, canActivate: [AuthGuard] },
  { path: 'period', component: PeriodComponent, canActivate: [AuthGuard] },
  { path: 'saledetail/:saleId', component: SaledetailComponent, canActivate: [AuthGuard] },
  { path: 'catalogs', component: CatalogsComponent, canActivate: [AuthGuard] },
  { path: 'gender', component: GenderComponent, canActivate: [AuthGuard] },
  { path: 'collect', component: CollectComponent, canActivate: [AuthGuard] },
  { path: 'collectWeek', component: CollectWeekComponent, canActivate: [AuthGuard] },
  { path: 'collectNextThreeDays', component: CollectNextThreeDaysComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
