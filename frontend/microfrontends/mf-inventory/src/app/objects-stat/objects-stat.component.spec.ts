import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjectsStatComponent} from './objects-stat.component';

describe('ObjectsStatComponent', () => {
  let component: ObjectsStatComponent;
  let fixture: ComponentFixture<ObjectsStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
