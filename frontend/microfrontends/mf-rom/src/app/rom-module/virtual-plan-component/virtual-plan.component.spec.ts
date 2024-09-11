import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VirtualPlanComponent} from './virtual-plan.component';

describe('VirtualPlanComponentComponent', () => {
  let component: VirtualPlanComponent;
  let fixture: ComponentFixture<VirtualPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
