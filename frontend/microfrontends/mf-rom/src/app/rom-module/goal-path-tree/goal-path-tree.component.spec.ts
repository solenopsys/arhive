import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GoalPathTreeComponent} from './goal-path-tree.component';

describe('GoalPathTreeComponent', () => {
  let component: GoalPathTreeComponent;
  let fixture: ComponentFixture<GoalPathTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalPathTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalPathTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
