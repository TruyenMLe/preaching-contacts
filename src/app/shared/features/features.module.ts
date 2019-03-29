import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [UnauthorizedComponent]
})
export class FeaturesModule { }
