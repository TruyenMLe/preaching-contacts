import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatGridListModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PlainFeatureComponent } from './plain-feature/plain-feature.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [UnauthorizedComponent, PlainFeatureComponent, DataTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule
  ],
  exports: [UnauthorizedComponent, PlainFeatureComponent, DataTableComponent]
})
export class FeaturesModule { }
