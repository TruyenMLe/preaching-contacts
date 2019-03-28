import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentPage: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const currentRoute = this.route.snapshot;
    this.currentPage = currentRoute.data.title ||
      (currentRoute.children && currentRoute.children.length ? currentRoute.children[0].data.title : '');
  }

}
