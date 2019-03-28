import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchPolicyComponent } from './church-policy.component';

describe('ChurchPolicyComponent', () => {
  let component: ChurchPolicyComponent;
  let fixture: ComponentFixture<ChurchPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
