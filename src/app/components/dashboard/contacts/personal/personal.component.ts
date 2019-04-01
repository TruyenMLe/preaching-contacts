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

  constructor() { }

  ngOnInit() {
    this.dataSource = ELEMENT_DATA;
    this.columnsToDisplay = [
      {name: 'Contact Name', value: 'contactName'}, {name: 'Preached At', value: 'preachedAt'}, {name: 'Preach Date', value: 'preachDate'},
      {name: 'Phone Number', value: 'phoneNumber'}
    ];
    this.stickyColumn = 'contactName';
  }

}
