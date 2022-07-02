import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { ErrorComponent } from './shared/error-404/error.component';

const ROUTES = [
    {path:'main-dashboard',
        component: MainDashboardComponent,
        loadChildren: ()=>
            import('./dashboard/dashboard.module').then(d=>d.DashboardModule)
    },
    {path: '**', component: ErrorComponent, pathMatch:'full'},
]

@NgModule({
    imports:[
        RouterModule.forRoot(
            ROUTES,
            {preloadingStrategy: PreloadAllModules}
            ),
    ],
    exports:[RouterModule],
  })
  export class AppRoutingModule { }