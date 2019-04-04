import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { SwitchLanguageDialogComponent } from './switch-language-dialog/switch-language-dialog.component';
import { NameValue } from '../../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidebar') sidebar;

  showMenu = false;
  mobileQuery: MediaQueryList;
  pageTitle: string;
  languages: NameValue[];

  private mobileQueryListener: () => void;

  constructor(private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private dialog: MatDialog,
              private media: MediaMatcher,
              private translate: TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.languages = [{name: 'English', value: 'en'}, {name: 'Espanol', value: 'es'}];
  }

  ngOnInit() {
    const currentRoute = this.route.snapshot;
    this.pageTitle = currentRoute.data.title ||
      (currentRoute.children && currentRoute.children.length ? currentRoute.children[0].data.title : '');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  /***
   * Temporary hack for fixing the sidebar opening issue when additional margin is incorrectly calculated
   * For more information, refer to https://github.com/angular/material2/issues/6743
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.toggleSidebar();
    }, 100);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SwitchLanguageDialogComponent, {
      width: '300px',
      data: {languages: this.languages}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.translate.use(result);
      }
    });
  }

  toggleSidebar() {
    this.sidebar.toggle();
  }

}
