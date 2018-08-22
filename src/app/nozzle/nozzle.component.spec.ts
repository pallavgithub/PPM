import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NozzleComponent } from './nozzle.component';

describe('NozzleComponent', () => {
  let component: NozzleComponent;
  let fixture: ComponentFixture<NozzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NozzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NozzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
