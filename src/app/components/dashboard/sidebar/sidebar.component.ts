import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface CustomRoute {
  isGroupHeader?: boolean;
  value: string;
  translation?: string;
  title?: string;
  icon?: string;
  children?: any[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentPage: string;
  routes: CustomRoute[];

  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.setActivePage();
    this.routes = [
      { isGroupHeader: true, value: 'MAIN' },
      { title: 'Home', value: 'Home', icon: 'home' },
      { title: 'Notifications', value: 'Notifications', translation: 'NOTIFICATIONS', icon: 'notifications' },
      {
        title: 'Elohim Academy', value: 'Elohim Academy', translation: 'APPLICATION', icon: 'school', children: [
          { title: 'Schedules', value: 'Schedules' },
          { title: 'Authorized List', value: 'Authorized List' },
          { title: 'Set Schedule', value: 'Set Schedule' },
          { title: 'Elohim Achievement', value: 'Elohim Achievement' },
          { title: 'Self Achievement', value: 'Self Achievement' },
        ]
      },
      { title: 'WATV Media Cast', value: 'WATV Media Cast', icon: 'movie' },
      { title: 'Contacts', value: 'Contacts', icon: 'contacts', children: [
          { title: 'Self', value: 'Self' },
          { title: 'Campus', value: 'Campus' },
          { title: 'Member', value: 'Member' },
          { title: 'Group', value: 'Group' },
          { title: 'Zion', value: 'Zion' },
        ]
      },
      { title: 'Forms', value: 'Forms', icon: 'insert_comment', children: [
          { title: 'Contacts', value: 'Contacts' },
          { title: 'Requests Forms', value: 'Requests Forms' }
        ]
      },
      { title: 'User Info', value: 'User Info', icon: 'person', children: [
          { title: 'Edit', value: 'Edit' },
          { title: 'Reset Password', value: 'Reset Password' },
          { title: 'Attendance', value: 'Attendance' },
          { title: 'Church Policy', value: 'Church Policy' }
        ]
      },
      { isGroupHeader: true, value: 'ADDITIONAL' },
      { title: 'Admin', value: 'Admin', icon: 'perm_data_setting', children: [
          { title: 'Account Access', value: 'Account Access' },
          { title: 'Add Group', value: 'Add Group' },
          { title: 'Move Member', value: 'Move Member' },
          { title: 'Reset Password', value: 'Reset Password' },
          { title: 'Reports', value: 'Reports' },
          { title: 'Attendance', value: 'Attendance' }
        ]
      }
    ];
  }

  goToPage(parentPage, childPage?) {
    let path;
    let subPath;
    switch (parentPage) {
      case 'Home':
        path = '';
        break;

      case 'Notifications':
        path = 'notifications';
        break;

      case 'Elohim Academy':
        path = 'elohim-academy';

        switch (childPage) {
          case 'Schedules':
            subPath = 'schedules';
            break;

          case 'Authorized List':
            subPath = 'authorized-list';
            break;

          case 'Set Schedule':
            subPath = 'set-schedule';
            break;

          case 'Elohim Achievement':
            subPath = 'elohim-achievement';
            break;

          case 'Self Achievement':
            subPath = 'self-achievement';
            break;
        }
        break;

      case 'WATV Media Cast':
        path = 'watv-media';
        break;

      case 'Contacts':
        path = 'contacts';

        switch (childPage) {
          case 'Self':
            subPath = 'self';
            break;

          case 'Campus':
            subPath = 'campus';
            break;

          case 'Member':
            subPath = 'member';
            break;

          case 'Group':
            subPath = 'group';
            break;

          case 'Zion':
            subPath = 'zion';
            break;
        }
        break;

      case 'Forms':
        path = 'forms';

        switch (childPage) {
          case 'Contacts':
            subPath = 'contacts';
            break;

          case 'Request Forms':
            subPath = 'requests';
            break;
        }
        break;

      case 'User Info':
        path = 'user-info';

        switch (childPage) {
          case 'Edit':
            subPath = 'edit';
            break;

          case 'Reset Password':
            subPath = 'reset-password';
            break;

          case 'Attendance':
            subPath = 'attendance';
            break;

          case 'Church Policy':
            subPath = 'policy';
            break;
        }
        break;

      case 'Admin':
        path = 'admin';

        switch (childPage) {
          case 'Account Access':
            subPath = 'account-access';
            break;

          case 'Add Group':
            subPath = 'add-group';
            break;

          case 'Move Member':
            subPath = 'move-member';
            break;

          case 'Reset Password':
            subPath = 'reset-password';
            break;

          case 'Reports':
            subPath = 'reports';
            break;

          case 'Attendance':
            subPath = 'attendance';
            break;
        }
        break;
    }

    const newRoutes = ['dashboard'];
    if (path) { newRoutes.push(path); }
    if (subPath) { newRoutes.push(subPath); }

    this.router.navigate(newRoutes)
      .then(() => {
        this.setActivePage();
      });
  }

  private setActivePage() {
    const currentRoute = this.route.snapshot;
    this.currentPage = currentRoute.data.title ||
      (currentRoute.children && currentRoute.children.length ? currentRoute.children[0].data.title : '');
  }

}
