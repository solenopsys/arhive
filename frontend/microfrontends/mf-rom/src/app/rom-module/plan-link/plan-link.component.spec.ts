import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanLinkComponent} from './plan-link.component';

describe('PlanLinkComponent', () => {
  let component: PlanLinkComponent;
  let fixture: ComponentFixture<PlanLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
