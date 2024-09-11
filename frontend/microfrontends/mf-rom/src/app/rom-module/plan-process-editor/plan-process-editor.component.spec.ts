import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanProcessEditorComponent} from './plan-process-editor.component';

describe('PlanProcessEditorComponent', () => {
  let component: PlanProcessEditorComponent;
  let fixture: ComponentFixture<PlanProcessEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanProcessEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanProcessEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
