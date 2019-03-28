import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZionComponent } from './zion.component';

describe('ZionComponent', () => {
  let component: ZionComponent;
  let fixture: ComponentFixture<ZionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
