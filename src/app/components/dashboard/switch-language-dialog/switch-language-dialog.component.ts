import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NameValue } from '../../../types';

export interface MultiLanguages {
  languages: NameValue[];
}

@Component({
  selector: 'app-switch-language-dialog',
  templateUrl: './switch-language-dialog.component.html',
  styleUrls: ['./switch-language-dialog.component.css']
})
export class SwitchLanguageDialogComponent {
  selectedLanguage: string;

  constructor(
    public dialogRef: MatDialogRef<SwitchLanguageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MultiLanguages) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
