import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { ComponentsRoutingModule } from './components-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { TopnavComponent } from './dashboard/topnav/topnav.component';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, HomeComponent, SidebarComponent, TopnavComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatMenuModule
  ]
})
export class ComponentsModule { }
