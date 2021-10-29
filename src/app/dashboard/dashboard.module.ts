import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SuperUserComponent } from './super-user/super-user.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PayoutsSummaryComponent } from './payouts-summary/payouts-summary.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardBarsModule } from '../dashboard-bars/dashboard-bars.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserProfileComponent,
    SuperUserComponent,
    MainDashboardComponent,
    TransactionsComponent,
    PayoutsSummaryComponent,
    FrequencyComponent,
    UserDashboardComponent,

  ],
  imports: [
    DashboardBarsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'main-dashboard',  
        component: MainDashboardComponent,
        children:[
          {path: 'profile', component:UserProfileComponent},
          {path: 'super-user', component:SuperUserComponent},
          {path: 'transactions', component:TransactionsComponent},
          {path: 'summary', component:PayoutsSummaryComponent},
          {path: 'frequency', component:FrequencyComponent},
          {path: 'user', component:UserDashboardComponent},
          {path: '', redirectTo:'user', pathMatch:'full'}
        ]
      },
    ]),
  ]
})
export class DashboardModule { }
