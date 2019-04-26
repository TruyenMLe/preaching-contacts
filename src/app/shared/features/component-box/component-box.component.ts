import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-box',
  templateUrl: './component-box.component.html',
  styleUrls: ['./component-box.component.css']
})
export class ComponentBoxComponent implements OnInit {
  @Input() boxClass: string;
  @Input() boxTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
