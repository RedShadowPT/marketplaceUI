import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './components/auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: './components/admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FrontpageComponent
  },
  {
    path: '**',
    component: FrontpageComponent
  }
];

@NgModule({
 imports: [RouterModule.forRoot(
  appRoutes,
   { enableTracing: false } // <-- true for debugging purposes only
  )],
 exports: [RouterModule]
})

export class AppRoutingModule {}
