import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RunningPageComponent} from './running-page.component';

describe('RunningPageComponent', () => {
  let component: RunningPageComponent;
  let fixture: ComponentFixture<RunningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
