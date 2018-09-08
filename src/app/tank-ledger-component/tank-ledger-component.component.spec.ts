import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankLedgerComponentComponent } from './tank-ledger-component.component';

describe('TankLedgerComponentComponent', () => {
  let component: TankLedgerComponentComponent;
  let fixture: ComponentFixture<TankLedgerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankLedgerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankLedgerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
