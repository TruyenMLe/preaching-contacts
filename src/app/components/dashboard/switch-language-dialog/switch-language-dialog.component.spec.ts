import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchLanguageDialogComponent } from './switch-language-dialog.component';

describe('SwitchLanguageDialogComponent', () => {
  let component: SwitchLanguageDialogComponent;
  let fixture: ComponentFixture<SwitchLanguageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchLanguageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
