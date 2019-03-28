import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElohimAchievementComponent } from './elohim-achievement.component';

describe('ElohimAchievementComponent', () => {
  let component: ElohimAchievementComponent;
  let fixture: ComponentFixture<ElohimAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElohimAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElohimAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
