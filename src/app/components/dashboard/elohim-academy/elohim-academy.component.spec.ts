import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElohimAcademyComponent } from './elohim-academy.component';

describe('ElohimAcademyComponent', () => {
  let component: ElohimAcademyComponent;
  let fixture: ComponentFixture<ElohimAcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElohimAcademyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElohimAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
