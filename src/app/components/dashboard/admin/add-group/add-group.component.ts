import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  addGroupForm: FormGroup = this.fb.group({
    region: '',
    zion: '',
    groupName: ''
  });
  regions: any[];
  newGroup: any;
  zions: any[];

  constructor(private fb: FormBuilder,
              private apiService: ApiService) {
    this.regions = [{regionId: 'midwest', regionName: 'Midwest'}, {regionId: 'west', regionName: 'West'}];
    this.newGroup = {
      members: [],
      totalMember: 0,
      totalContact: 0
    };
  }

  ngOnInit() {
    this.loadZions(this.regions[0].regionId);
  }

  private loadZions(region) {
    return this.apiService.loadZions(region)
      .subscribe((response: any[]) => this.zions = response);
  }

}
