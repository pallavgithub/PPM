import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpInfoComponent } from './pump-info.component';

describe('PumpInfoComponent', () => {
  let component: PumpInfoComponent;
  let fixture: ComponentFixture<PumpInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
