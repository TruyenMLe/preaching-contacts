import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  reasonCode: string;
  reasonDescription: string;

  constructor() { }

  ngOnInit() {
    this.reasonCode = 'Access Denied';
    this.reasonDescription = `Full authentication is required to access this resource. Please contact administrator or office
                              affairs for more information`;
  }

}
