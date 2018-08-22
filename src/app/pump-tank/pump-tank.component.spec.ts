import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpTankComponent } from './pump-tank.component';

describe('PumpTankComponent', () => {
  let component: PumpTankComponent;
  let fixture: ComponentFixture<PumpTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
