import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SharedService {

  constructor(private snackBar: MatSnackBar) { }

  toastInfo(msg) {
    this.snackBar.open(msg);
  }
}
