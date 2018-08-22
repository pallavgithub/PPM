import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankformComponent } from './tankform.component';

describe('TankformComponent', () => {
  let component: TankformComponent;
  let fixture: ComponentFixture<TankformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
