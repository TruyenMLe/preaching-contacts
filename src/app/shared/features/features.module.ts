import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PlainFeatureComponent } from './plain-feature/plain-feature.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ComponentBoxComponent } from './component-box/component-box.component';

@NgModule({
  declarations: [UnauthorizedComponent, PlainFeatureComponent, DataTableComponent, ComponentBoxComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [UnauthorizedComponent, PlainFeatureComponent, DataTableComponent, ComponentBoxComponent]
})
export class FeaturesModule { }
