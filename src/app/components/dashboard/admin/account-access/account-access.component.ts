import { Component, OnInit } from '@angular/core';

import { UserAccount } from '../../../../contact-data';
import { NameValue } from '../../../../types';
import { DataTableComponent } from '../../../../shared/features/data-table/data-table.component';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-account-access',
  templateUrl: './account-access.component.html',
  styleUrls: ['./account-access.component.css']
})
export class AccountAccessComponent implements OnInit {
  dataSource: UserAccount[];
  columnsToDisplay: NameValue[];
  stickyColumn: string;
  pageLength: number;
  pageIndex: number;
  pageSize: number;
  userAccounts: UserAccount[];
  regions: any[];
  groups: any[];

  constructor(private authService: AuthService) {
    this.regions = [{regionId: 'midwest', regionName: 'Midwest'}, {regionId: 'west', regionName: 'West'}];
    this.groups = [{groupId: '41640', groupName: 'Cedar Rapids, IA'}, {groupId: '74592', groupName: 'Aurora, CO'},
      {groupId: '55117', groupName: 'B. Vicente Xivir'}, {groupId: '48413', groupName: 'S. Ramica Williams'}];
  }

  ngOnInit() {
    this.columnsToDisplay = [
      {name: 'FirstName', value: 'firstName'}, {name: 'Last Name', value: 'lastName'}, {name: 'Region', value: 'regionName'},
      {name: 'Group', value: 'groupName'}
    ];
    this.stickyColumn = 'firstName';

    this.loadData();
  }

  enableAccount(dataTableRef: DataTableComponent) {
    return this.authService.enableAccount(dataTableRef.selection.selected)
      .subscribe(() => {
        dataTableRef.selection.clear();
        this.loadData();
      });
  }

  goToNewPage(newPage) {
    if (newPage) {
      this.dataSource = this.mapData(this.paginateData(this.userAccounts, newPage.pageIndex, newPage.pageSize));
    }
  }

  private loadData() {
    return this.authService.getRequestedUsers()
      .subscribe((response: UserAccount[]) => {
        this.userAccounts = response;
        this.pageLength = this.userAccounts.length;
        this.dataSource = this.mapData(this.paginateData(this.userAccounts, 0, 10));
      });
  }

  private mapData(src) {
    return src.map((item) => {
      const matchRegion = this.regions.find(region => region.regionId === item.region);
      item.regionName = matchRegion ? matchRegion.regionName : '';
      const matchGroup = this.groups.find(group => group.groupId === item.groupId);
      item.groupName = matchGroup ? matchGroup.groupName : '';
      return item;
    });
  }

  private paginateData(data, newIndex, newSize) {
    this.pageIndex = newIndex;
    this.pageSize = newSize;
    return data.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

}
