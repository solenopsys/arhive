import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanLinksGroupComponent} from './plan-links-group.component';

describe('PlanLinksGroupComponent', () => {
  let component: PlanLinksGroupComponent;
  let fixture: ComponentFixture<PlanLinksGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanLinksGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanLinksGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
