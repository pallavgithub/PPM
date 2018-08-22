import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpRegisterComponent } from './pump-register.component';

describe('PumpRegisterComponent', () => {
  let component: PumpRegisterComponent;
  let fixture: ComponentFixture<PumpRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
