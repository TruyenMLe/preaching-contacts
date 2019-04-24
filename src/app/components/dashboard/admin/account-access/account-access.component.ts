import { Component, OnInit } from '@angular/core';
import { UserAccount, USER_ACCOUNTS } from '../../../../contact-data';
import { NameValue } from '../../../../types';
import { DataTableComponent } from '../../../../shared/features/data-table/data-table.component';

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

  constructor() { }

  ngOnInit() {
    this.columnsToDisplay = [
      {name: 'FirstName', value: 'firstName'}, {name: 'Last Name', value: 'lastName'}, {name: 'Region', value: 'region'},
      {name: 'Group', value: 'groupId'}
    ];
    this.stickyColumn = 'firstName';
    this.pageLength = USER_ACCOUNTS.length;
    this.paginateData(0, 10);
  }

  enableAccount(dataTableRef: DataTableComponent) {
    console.log(dataTableRef.selection.selected);
  }

  goToNewPage(newPage) {
    if (newPage) {
      this.paginateData(newPage.pageIndex, newPage.pageSize);
    }
  }

  paginateData(newIndex, newSize) {
    this.pageIndex = newIndex;
    this.pageSize = newSize;
    this.dataSource = USER_ACCOUNTS.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

}
