import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NozzleformComponent } from './nozzleform.component';

describe('NozzleformComponent', () => {
  let component: NozzleformComponent;
  let fixture: ComponentFixture<NozzleformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NozzleformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NozzleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
