import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataTableComponent implements OnInit {
  @Input() dataSource: any[];

  columnsToDisplay: string[];
  stickyColumn: string;
  expandedElement: any | null;

  constructor() { }

  ngOnInit() {
    this.columnsToDisplay = ['contactName', 'preachedAt', 'preachDate', 'phoneNumber'];
    this.stickyColumn = 'name';
  }

}
