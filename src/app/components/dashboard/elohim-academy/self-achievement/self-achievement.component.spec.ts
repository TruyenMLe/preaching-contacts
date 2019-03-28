import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAchievementComponent } from './self-achievement.component';

describe('SelfAchievementComponent', () => {
  let component: SelfAchievementComponent;
  let fixture: ComponentFixture<SelfAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
