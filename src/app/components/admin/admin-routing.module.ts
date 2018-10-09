import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersAdminComponent } from './usersAdmin/users-admin.component';
import { LogsAdminComponent } from './logs/logs-admin.component';
import { AuthGuard } from '../auth/auth.guard';

const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersAdminComponent },
      { path: 'logs', component: LogsAdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

