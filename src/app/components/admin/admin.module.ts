import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { SettingsComponent } from './settings/settings.component';
import { UsersAdminComponent } from './usersAdmin/users-admin.component';
import { LogsAdminComponent } from './logs/logs-admin.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    SettingsComponent,
    UsersAdminComponent,
    LogsAdminComponent
  ]
})
export class AdminModule { }
