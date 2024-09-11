import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessIOComponent} from './process-io.component';

describe('ProcessIOComponent', () => {
  let component: ProcessIOComponent;
  let fixture: ComponentFixture<ProcessIOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessIOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessIOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
