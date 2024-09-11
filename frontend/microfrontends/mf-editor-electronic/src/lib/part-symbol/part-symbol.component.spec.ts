import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSymbolComponent } from './part-symbol.component';

describe('PartSymbolComponent', () => {
  let component: PartSymbolComponent;
  let fixture: ComponentFixture<PartSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartSymbolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
