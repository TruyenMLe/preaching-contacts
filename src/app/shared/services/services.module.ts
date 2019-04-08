import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';

import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@NgModule({
  imports: [
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    SharedService
  ]
})
export class ServicesModule { }
