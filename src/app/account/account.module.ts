import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset-password/reset.component';
import { SignupComponent } from './signup/signup.component';




@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'signup', component: SignupComponent},
      {path: 'reset', component: ResetComponent},
      {path: 'login', component: LoginComponent},
      {path:'', redirectTo: 'login', pathMatch:'full'},
    ])
  ]
})
export class AccountModule { }
