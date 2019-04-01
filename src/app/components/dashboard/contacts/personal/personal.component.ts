import { Component, OnInit } from '@angular/core';
import { ContactData, ELEMENT_DATA } from '../../../../contact-data';
import { NameValue } from '../../../../types';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  dataSource: ContactData[];
  columnsToDisplay: NameValue[];
  stickyColumn: string;
  pageLength: number;
  pageIndex: number;
  pageSize: number;

  constructor() { }

  ngOnInit() {
    this.columnsToDisplay = [
      {name: 'Contact Name', value: 'contactName'}, {name: 'Preached At', value: 'preachedAt'}, {name: 'Preach Date', value: 'preachDate'},
      {name: 'Phone Number', value: 'phoneNumber'}
    ];
    this.stickyColumn = 'contactName';
    this.pageLength = ELEMENT_DATA.length;
    this.paginateData(0, 10);
  }

  goToNewPage(newPage) {
    if (newPage) {
      this.paginateData(newPage.pageIndex, newPage.pageSize);
    }
  }

  paginateData(newIndex, newSize) {
    this.pageIndex = newIndex;
    this.pageSize = newSize;
    this.dataSource = ELEMENT_DATA.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

}
