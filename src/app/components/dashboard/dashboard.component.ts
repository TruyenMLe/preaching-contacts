import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

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
  private mobileQueryListener: () => void;

  constructor(private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
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

  toggleSidebar() {
    this.sidebar.toggle();
  }

}
