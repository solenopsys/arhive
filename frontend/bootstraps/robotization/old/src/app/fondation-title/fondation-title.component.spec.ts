import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondationTitleComponent } from './fondation-title.component';

describe('FondationTitleComponent', () => {
  let component: FondationTitleComponent;
  let fixture: ComponentFixture<FondationTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FondationTitleComponent]
    });
    fixture = TestBed.createComponent(FondationTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
