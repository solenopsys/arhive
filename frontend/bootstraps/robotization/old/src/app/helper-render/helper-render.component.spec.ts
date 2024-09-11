import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperRenderComponent } from './helper-render.component';

describe('HelperRenderComponent', () => {
  let component: HelperRenderComponent;
  let fixture: ComponentFixture<HelperRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelperRenderComponent]
    });
    fixture = TestBed.createComponent(HelperRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
