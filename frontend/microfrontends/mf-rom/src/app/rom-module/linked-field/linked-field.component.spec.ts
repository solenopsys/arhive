import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkedFieldComponent} from './linked-field.component';

describe('LinkedFieldComponent', () => {
  let component: LinkedFieldComponent;
  let fixture: ComponentFixture<LinkedFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
