import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
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
import { NewContactComponent } from './dashboard/forms/new-contact/new-contact.component';
import { RequestsComponent } from './dashboard/forms/requests/requests.component';
import { EditComponent } from './dashboard/user-info/edit/edit.component';
import { ResetPasswordComponent } from './dashboard/user-info/reset-password/reset-password.component';
import { AttendanceComponent } from './dashboard/user-info/attendance/attendance.component';
import { ChurchPolicyComponent } from './dashboard/user-info/church-policy/church-policy.component';
import { AccountAccessComponent } from './dashboard/admin/account-access/account-access.component';
import { AddGroupComponent } from './dashboard/admin/add-group/add-group.component';
import { MoveMemberComponent } from './dashboard/admin/move-member/move-member.component';
import { ReportsComponent } from './dashboard/admin/reports/reports.component';
import { UnauthorizedComponent } from '../shared/features/unauthorized/unauthorized.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { AdminGuard } from '../shared/services/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'Notifications' }
      },
      {
        path: 'elohim-academy',
        component: ElohimAcademyComponent,
        data: { title: 'Elohim Academy' },
        children: [
          {
            path: 'schedules',
            component: SchedulesComponent,
            data: { title: 'Schedules' }
          },
          {
            path: 'authorized-list',
            component: AuthorizedListComponent,
            data: { title: 'Authorized List' }
          },
          {
            path: 'set-schedule',
            component: SetScheduleComponent,
            data: { title: 'Set Schedule' }
          },
          {
            path: 'elohim-achievement',
            component: ElohimAchievementComponent,
            data: { title: 'Elohim Achievement' }
          },
          {
            path: 'self-achievement',
            component: SelfAchievementComponent,
            data: { title: 'Self Achievement' }
          }
        ]
      },
      {
        path: 'watv-media',
        component: WatvMediaComponent,
        data: { title: 'WATV Media Cast' }
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        data: { title: 'Contacts' },
        children: [
          {
            path: 'self',
            component: PersonalComponent,
            data: { title: 'Self' }
          },
          {
            path: 'campus',
            component: CampusComponent,
            data: { title: 'Campus' }
          },
          {
            path: 'member',
            component: MemberComponent,
            data: { title: 'Member' }
          },
          {
            path: 'group',
            component: GroupComponent,
            data: { title: 'Group' }
          },
          {
            path: 'zion',
            component: ZionComponent,
            data: { title: 'Zion' }
          }
        ]
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: { title: 'Forms' },
        children: [
          {
            path: 'contacts',
            component: NewContactComponent,
            data: { title: 'Contacts' }
          },
          {
            path: 'requests',
            component: RequestsComponent,
            data: { title: 'Requests' }
          }
        ]
      },
      {
        path: 'user-info',
        component: UserInfoComponent,
        data: { title: 'User Info' },
        children: [
          {
            path: 'edit',
            component: EditComponent,
            data: { title: 'Edit' }
          },
          {
            path: 'reset-password',
            component: ResetPasswordComponent,
            data: { title: 'Reset Password' }
          },
          {
            path: 'attendance',
            component: AttendanceComponent,
            data: { title: 'Attendance' }
          },
          {
            path: 'church-policy',
            component: ChurchPolicyComponent,
            data: { title: 'Church Policy' }
          },
          {
            path: 'zion',
            component: ZionComponent,
            data: { title: 'Zion' }
          }
        ]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        data: { title: 'Admin' },
        children: [
          {
            path: 'account-access',
            component: AccountAccessComponent,
            data: { title: 'Account Access' }
          },
          {
            path: 'add-group',
            component: AddGroupComponent,
            data: { title: 'Add Group' }
          },
          {
            path: 'move-member',
            component: MoveMemberComponent,
            data: { title: 'MoveMember' }
          },
          {
            path: 'reset-password',
            component: ResetPasswordComponent,
            data: { title: 'Reset Password' }
          },
          {
            path: 'reports',
            component: ReportsComponent,
            data: { title: 'Reports' }
          },
          {
            path: 'attendance',
            component: AttendanceComponent,
            data: { title: 'Attendance' }
          }
        ]
      }
    ]
  },
  {
    path: '403',
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
