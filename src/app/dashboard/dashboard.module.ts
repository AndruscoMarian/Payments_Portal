import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardBarsModule } from '../dashboard-bars/dashboard-bars.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';


import { SuperUserComponent } from './super-user/super-user.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PayoutsSummaryComponent } from './payouts-summary/payouts-summary.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { TransactionsService } from 'src/app/dashboard/utilities/transactions/TransactionsService';
import { UsersService } from 'src/app/dashboard/utilities/users/UsersSerice';
import { UsersUtility } from './utilities/users-utility/UsersUtility';
import { TransactionsUtility } from './utilities/transactions-utility/TransactionsUtility';
import { SuperUserDetailComponent } from './super-user-detail/super-user-detail.component';
import { TransactionsDetailComponent } from './transactions-detail/transactions-detail.component';


// overlay
import { FilePreviewOverlayComponent } from './overlay/file-preview-overlay.component';
import { FilePreviewOverlayService } from './overlay/file-preview-overlay.service';
import { TransactionFilePreviewOverlayComponent } from './transaction_overlay/transaction-file-preview-overlay.component';
import { TransactionFilePreviewOverlayService } from './transaction_overlay/transaction-file-preview-overlay.service';


// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { 
        // transactionBtn, 
        transactionBtnActions, 
      } from './state_tran_btn/transaction_btn.reducer';
import { transactions } from './state_transactions/transactions_reducer';
import { TransactionsEffects } from './state_transactions/transactions_effects';

import { users } from './state_users/users_reducer';
import { UsersEffects } from './state_users/users_effects';

// Pagination module
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    UserProfileComponent,
    MainDashboardComponent,
    PayoutsSummaryComponent,
    FrequencyComponent,
    UserDashboardComponent,
    SuperUserComponent,
    SuperUserDetailComponent,
    TransactionsComponent,
    TransactionsDetailComponent,
    FilePreviewOverlayComponent,
    TransactionFilePreviewOverlayComponent

  ],
  providers:[
    TransactionsService,
    UsersService,
    UsersUtility,
    TransactionsUtility,
    FilePreviewOverlayService,
    TransactionFilePreviewOverlayService
  ],
  entryComponents: [
    FilePreviewOverlayComponent,
    TransactionFilePreviewOverlayComponent
  ],
  imports: [
    HttpClientModule,
    DashboardBarsModule,
    ReactiveFormsModule,
    FormsModule,
    PortalModule,
    OverlayModule,
    NgxPaginationModule,
    RouterModule.forChild([
  
          {path: 'profile', component:UserProfileComponent},
          {path: 'super-user', component:SuperUserComponent},
          {path: 'super-user/:id', component:SuperUserComponent},
          {path: 'transactions', component:TransactionsComponent},
          {path: 'transactions/:id', component:TransactionsComponent},
          {path: 'summary', component:PayoutsSummaryComponent},
          {path: 'frequency', component:FrequencyComponent},
          {path: 'user', component:UserDashboardComponent},
          {path: '', redirectTo:'user', pathMatch:'full'}
        ]
    ),
    StoreModule.forFeature('users', users),
    StoreModule.forFeature('transactionBtn',
      // transactionBtn,
      transactionBtnActions),
    StoreModule.forFeature('transactions', transactions),
    EffectsModule.forFeature([UsersEffects, TransactionsEffects])
  ]
})
export class DashboardModule { }
