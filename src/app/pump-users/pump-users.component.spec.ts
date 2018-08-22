import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpUsersComponent } from './pump-users.component';

describe('PumpUsersComponent', () => {
  let component: PumpUsersComponent;
  let fixture: ComponentFixture<PumpUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
