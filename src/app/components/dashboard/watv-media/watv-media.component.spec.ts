import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatvMediaComponent } from './watv-media.component';

describe('WatvMediaComponent', () => {
  let component: WatvMediaComponent;
  let fixture: ComponentFixture<WatvMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatvMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatvMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
