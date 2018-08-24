import { FuelType } from '../_models/FuelType';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { pp_Tank } from '../_models/pp_Tank';
import { pp_Nozzle } from '../_models/pp_Nozzle';
import { ReadingType } from '../_models/ReadingType';
import { UserService } from '../_services';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { ToasterService } from 'angular2-toaster';
import { FormsModule, FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms'
import { Router } from '@angular/router';
import { DatePipe } from '../../../node_modules/@angular/common';

@Component({
  selector: 'tankform',
  templateUrl: './tankform.component.html',
  styleUrls: ['./tankform.component.css']
})
export class TankformComponent implements OnInit {

  tank: pp_Tank = new pp_Tank();
  IsEditDialog: boolean;
  fuelTypes: FuelType[];
  readingTypes: ReadingType[];
  tankform: FormGroup;
  validationFuelTypeMessage: string;
  validation_messages = {
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'Password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ],
    'UserId': [
      { type: 'required', message: 'UserId is required' },
      { type: 'minlength', message: 'UserId must be at least 5 characters long' }
    ],
    'FuelTypeID': [
      { type: 'required', message: 'Product is required' }
    ],
    'TankName': [
      { type: 'required', message: 'Tank Name is required' }
    ],
    'ReadingType': [
      { type: 'required', message: 'Reading Type is required' }
    ],
    'Phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'minlength', message: 'Phone must be at least 10 characters long' },
      { type: 'maxlength', message: 'Phone can be 12 characters long' },
      { type: 'pattern', message: 'Only Numbers are allowed.' }
    ],
    'CreditLimit': [
      { type: 'pattern', message: 'Only Numbers are allowed.' }
    ]
  }
  constructor(private toasterService: ToasterService, private router: Router, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data, private pumpService: PetrolPumpService,
    private dialogRef: MatDialogRef<TankformComponent>, private _formBuilder: FormBuilder, public datepipe: DatePipe) { }

  ngOnInit() {
    this.tank = this.data.tank;
    if (this.tank.IsEditModal) {
      this.IsEditDialog = true;
    }
    else {
      this.IsEditDialog = false;
    }
    this.getFuelTypeByID(this.tank.PetrolPumpCode);
    this.getReadingType();
    this.tankform = this._formBuilder.group({
      ID: [this.tank.ID],
      PetrolPumpCode: [this.tank.PetrolPumpCode],
      TankCode: [this.tank.TankCode],
      FuelTypeID: [this.tank.FuelTypeID],
      TankCapacity: [this.tank.TankCapacity],
      TankName: [this.tank.TankName, Validators.compose([Validators.required])],
      ReadingDate: [this.tank.ReadingDate],
      OpeningReading: [this.tank.OpeningReading],
      ReadingType: [this.tank.ReadingType],
      DipReadingType: [this.tank.DipReadingType],
      IsEditModal: [this.tank.IsEditModal],
      DipReadingDate: [this.tank.DipReadingDate],
      DipOpeningReading: [this.tank.DipOpeningReading],
    });
    let latest_date = this.datepipe.transform(this.tank.ReadingDate, 'yyyy-MM-dd');
    this.tankform.get('ReadingDate').setValue(latest_date);
    // let dateTemp:string = this.tank.ReadingDate;
    // this.tankform.get('ReadingType').setValue({
    //   year: parseInt((dateTemp.format('YYYY'), 10),
    //   month: parseInt(date.format('M'), 10),
    //   day: parseInt(date.format('D'), 10)
    // });
    this.tank.pp_Nozzles.length == 0 && this.tank.pp_Nozzles.push(new pp_Nozzle());
  }

  checkFormValid() {
    if (this.tankform.controls['FuelTypeID'].value == 0) {
      this.validationFuelTypeMessage = "Please select Fuel Type";
      return false;
    }
    else {
      this.validationFuelTypeMessage = "";
    }
  }
  onchange() {
    this.checkFormValid();
  }
  getAllFuelType() {
    this.userService.getAllFuelType().subscribe(data => {
      this.fuelTypes = data;
    });
  }
  getReadingType() {
    this.userService.getReadingType().subscribe(data => {
      this.readingTypes = data;
    });
  }
  getFuelTypeByID(petrolPumpCode: string) {
    this.userService.getFuelTypeByID(petrolPumpCode).subscribe(data => {
      this.fuelTypes = data;
      this.fuelTypes = this.fuelTypes.filter(item => item.Name != 'CNG' && item.Name != 'Lubes - Motor Oil'
        && item.Name != 'Lubes - Gear Oil' && item.Name != 'Lubes - Transmission Fluid'
        && item.Name != 'Lubes - White Grease' && item.Name != 'Lubes - Electronic Grease' && item.Name != 'Polution');
    });
  }
  createTank() {
    this.pumpService.addUpdatePumpTank(this.tankform.value).subscribe(res => {
      this.toasterService.pop('success', '', "Saved successfully");
      this.dialogRef.close();
      this.router.navigate(['/pumpDetails', this.tank.PetrolPumpCode]);
    })
  }
  addNozzle() {
    this.tank.pp_Nozzles.push(new pp_Nozzle());
  }
  removeNozzle(i: number) {
    this.tank.pp_Nozzles.splice(i, 1);
  }
}
