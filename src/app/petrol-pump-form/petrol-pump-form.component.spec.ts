import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolPumpFormComponent } from './petrol-pump-form.component';

describe('PetrolPumpFormComponent', () => {
  let component: PetrolPumpFormComponent;
  let fixture: ComponentFixture<PetrolPumpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrolPumpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolPumpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
