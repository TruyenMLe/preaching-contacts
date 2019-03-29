import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainFeatureComponent } from './plain-feature.component';

describe('PlainFeatureComponent', () => {
  let component: PlainFeatureComponent;
  let fixture: ComponentFixture<PlainFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
