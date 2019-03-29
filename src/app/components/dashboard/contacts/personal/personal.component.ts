import { Component, OnInit } from '@angular/core';
import { ContactData, ELEMENT_DATA } from '../../../../contact-data';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  dataSource: ContactData[];

  constructor() { }

  ngOnInit() {
    this.dataSource = ELEMENT_DATA;
  }

}
