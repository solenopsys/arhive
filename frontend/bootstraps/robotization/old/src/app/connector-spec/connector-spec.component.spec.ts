import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorSpecComponent } from './connector-spec.component';

describe('ConnectorSpecComponent', () => {
  let component: ConnectorSpecComponent;
  let fixture: ComponentFixture<ConnectorSpecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorSpecComponent]
    });
    fixture = TestBed.createComponent(ConnectorSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
