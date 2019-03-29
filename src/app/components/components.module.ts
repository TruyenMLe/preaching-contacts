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
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { ElohimAcademyComponent } from './dashboard/elohim-academy/elohim-academy.component';
import { WatvMediaComponent } from './dashboard/watv-media/watv-media.component';
import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { FormsComponent } from './dashboard/forms/forms.component';
import { UserInfoComponent } from './dashboard/user-info/user-info.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { SchedulesComponent } from './dashboard/elohim-academy/schedules/schedules.component';
import { AuthorizedListComponent } from './dashboard/elohim-academy/authorized-list/authorized-list.component';
import { SetScheduleComponent } from './dashboard/elohim-academy/set-schedule/set-schedule.component';
import { ElohimAchievementComponent } from './dashboard/elohim-academy/elohim-achievement/elohim-achievement.component';
import { SelfAchievementComponent } from './dashboard/elohim-academy/self-achievement/self-achievement.component';
import { PersonalComponent } from './dashboard/contacts/personal/personal.component';
import { CampusComponent } from './dashboard/contacts/campus/campus.component';
import { MemberComponent } from './dashboard/contacts/member/member.component';
import { GroupComponent } from './dashboard/contacts/group/group.component';
import { ZionComponent } from './dashboard/contacts/zion/zion.component';
import { RequestsComponent } from './dashboard/forms/requests/requests.component';
import { EditComponent } from './dashboard/user-info/edit/edit.component';
import { ResetPasswordComponent } from './dashboard/user-info/reset-password/reset-password.component';
import { AttendanceComponent } from './dashboard/user-info/attendance/attendance.component';
import { ChurchPolicyComponent } from './dashboard/user-info/church-policy/church-policy.component';
import { AccountAccessComponent } from './dashboard/admin/account-access/account-access.component';
import { AddGroupComponent } from './dashboard/admin/add-group/add-group.component';
import { MoveMemberComponent } from './dashboard/admin/move-member/move-member.component';
import { ReportsComponent } from './dashboard/admin/reports/reports.component';
import { NewContactComponent } from './dashboard/forms/new-contact/new-contact.component';
import { FeaturesModule } from '../shared/features/features.module';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    TopnavComponent,
    NotificationsComponent,
    ElohimAcademyComponent,
    WatvMediaComponent,
    ContactsComponent,
    FormsComponent,
    UserInfoComponent,
    AdminComponent,
    SchedulesComponent,
    AuthorizedListComponent,
    SetScheduleComponent,
    ElohimAchievementComponent,
    SelfAchievementComponent,
    PersonalComponent,
    CampusComponent,
    MemberComponent,
    GroupComponent,
    ZionComponent,
    RequestsComponent,
    EditComponent,
    ResetPasswordComponent,
    AttendanceComponent,
    ChurchPolicyComponent,
    AccountAccessComponent,
    AddGroupComponent,
    MoveMemberComponent,
    ReportsComponent,
    NewContactComponent
  ],
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
    MatMenuModule,
    FeaturesModule
  ]
})
export class ComponentsModule {
}
