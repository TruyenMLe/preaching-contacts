import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBoxComponent } from './component-box.component';

describe('ComponentBoxComponent', () => {
  let component: ComponentBoxComponent;
  let fixture: ComponentFixture<ComponentBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
