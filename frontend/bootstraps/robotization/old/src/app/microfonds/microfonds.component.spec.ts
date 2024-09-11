import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofondsComponent } from './microfonds.component';

describe('MicrofondsComponent', () => {
  let component: MicrofondsComponent;
  let fixture: ComponentFixture<MicrofondsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicrofondsComponent]
    });
    fixture = TestBed.createComponent(MicrofondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
