import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NameValue } from '../../../types';

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
  @Input() columnsToDisplay: NameValue[];
  @Input() stickyColumn: string;
  @Input() selection: boolean;
  @Input() identifier: string;

  expandedElement: any | null;
  columnsToDisplayValues: string[];
  selectAll: boolean;
  selectedData: any;

  constructor() {
    this.selectedData = {};
  }

  ngOnInit() {
    this.columnsToDisplayValues = this.columnsToDisplay.map(column => column.value);

    if (this.selection) {
      this.columnsToDisplayValues.unshift('selection');
    }
  }

  toggleAllSelection(value) {
    this.selectAll = value;
    for (const dataRow of this.dataSource) {
      this.selectedData[dataRow[this.identifier]] = this.selectAll;
    }
  }

  toggleSelection() {
    let count = 0;

    for (const prop in this.selectedData) {
      if (this.selectedData.hasOwnProperty(prop) && this.selectedData[prop]) {
        count++;
      }
    }

    this.selectAll = count === this.dataSource.length;
  }

}
