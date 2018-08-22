import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpUserMapComponent } from './pump-user-map.component';

describe('PumpUserMapComponent', () => {
  let component: PumpUserMapComponent;
  let fixture: ComponentFixture<PumpUserMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpUserMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpUserMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
