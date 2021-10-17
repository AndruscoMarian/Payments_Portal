import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './shared/error-404/error.component';

const ROUTES = [
    {path: '**', component: ErrorComponent, pathMatch:'full'},
]

@NgModule({
    imports:[
        RouterModule.forRoot(ROUTES),
    ],
    exports:[RouterModule],
  })
  export class AppRoutingModule { }