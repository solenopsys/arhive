import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementLayoutComponent } from './element-layout.component';

describe('ElementLayoutComponent', () => {
  let component: ElementLayoutComponent;
  let fixture: ComponentFixture<ElementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
