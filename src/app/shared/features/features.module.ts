import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatGridListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PlainFeatureComponent } from './plain-feature/plain-feature.component';

@NgModule({
  declarations: [UnauthorizedComponent, PlainFeatureComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [UnauthorizedComponent, PlainFeatureComponent]
})
export class FeaturesModule { }
