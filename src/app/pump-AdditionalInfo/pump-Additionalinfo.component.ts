import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { pp_PetrolPump } from '../_models/pp_PetrolPump';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { ToasterService } from 'angular2-toaster';
import { State } from '../_models/State';
import { UserDetail } from '../_models/userDetail';


@Component({
  selector: 'pump-Additionalinfo',
  templateUrl: './pump-Additionalinfo.component.html',
  styleUrls: ['./pump-Additionalinfo.component.css']
})
export class PumpAdditionalInfoComponent implements OnInit {
  @Input() petrolPump: pp_PetrolPump;
  pumpAdditionalInfoForm: FormGroup;
  public userData: UserDetail;
  RoleID:number;
  validationStateMessage:string;
  states: State[]
  validation_messages = {
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'Address': [
      { type: 'required', message: 'Address Line 1 is required' },
      { type: 'maxlength', message: 'Maximum 255 charecters are allowed' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ],
    'Address2': [
      { type: 'required', message: 'Address Line 2 is required' },
      { type: 'maxlength', message: 'Maximum 255 charecters are allowed' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ],
    'City': [
      { type: 'required', message: 'City is required' },
      { type: 'maxlength', message: 'Maximum 20 charecters are allowed' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ],
    'PetrolPumpName': [
      { type: 'required', message: 'Petrol Pump Name is required' },
      { type: 'minlength', message: 'Petrol Pump Name must be at least 3 characters long' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @ and & are allowed.' }
    ],
    'OwnerName': [
      { type: 'required', message: 'Owner Name is required' },
      { type: 'minlength', message: 'Owner Name must be at least 3 characters long' },
      { type: 'pattern', message: 'Only Alphabets, Numbers and spaces are allowed.' }
    ],
    'Mobile': [
      { type: 'required', message: 'Mobile is required' },
      { type: 'minlength', message: 'Mobile must be at least 10 characters long' },
      { type: 'maxlength', message: 'Mobile can be 12 characters long' },
      { type: 'pattern', message: 'Only Numbers are allowed.' }
    ],
    'PetrolPumpPincode': [
      { type: 'required', message: 'Pincode is required' },
      { type: 'minlength', message: 'Pincode must be 6 characters long' },
      { type: 'maxlength', message: 'Pincode must be 6 characters long' },
      { type: 'pattern', message: 'Only 6 digit Numbers are allowed.' }
    ],
    'TIN': [
      { type: 'required', message: 'TIN is required' },
      { type: 'minlength', message: 'TIN must be 11 characters long' },
      { type: 'maxlength', message: 'TIN must be 11 characters long' },
      { type: 'pattern', message: 'Only 11 digit Numbers are allowed.' }
    ],
    'CST': [
      { type: 'required', message: 'CST is required' },
      { type: 'minlength', message: 'CST must be 11 characters long' },
      { type: 'maxlength', message: 'CST must be 11 characters long' },
      { type: 'pattern', message: 'Only 11 digit numbers are allowed.' }
    ],
    'LicenseStartDate': [
      { type: 'required', message: 'License Start Date is required' }
    ],
    'LicenseEndDate': [
      { type: 'required', message: 'License End Date is required' }
    ]
  }
  constructor(private toasterService: ToasterService, private _formBuilder: FormBuilder, private router: Router, private petrolPumpService: PetrolPumpService,private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit() {
    this.pumpAdditionalInfoForm = this._formBuilder.group({
      PetrolPumpCode: [this.petrolPump.PetrolPumpCode],
      PetrolPumpName: [this.petrolPump.PetrolPumpName],
      PetrolPumpPincode: [this.petrolPump.PetrolPumpPincode, Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^(\\s*|\\d{6,6})$')])],
      OwnerName: [this.petrolPump.OwnerName],
      Logo: [this.petrolPump.Logo],
      Address: [this.petrolPump.Address, Validators.compose([Validators.required, Validators.maxLength(255)])],
      Address2: [this.petrolPump.Address2, Validators.compose([Validators.required, Validators.maxLength(255)])],
      City: [this.petrolPump.City, Validators.compose([Validators.required, Validators.maxLength(20)])],
      State: [this.petrolPump.State, Validators.compose([Validators.required])],
      Mobile: [this.petrolPump.Mobile],
      Email: [this.petrolPump.Email],
      TIN: [this.petrolPump.TIN, Validators.compose([Validators.pattern('^(\\s*|\\d{11,11})$')])],
      CST: [this.petrolPump.CST, Validators.compose([Validators.pattern('^(\\s*|\\d{11,11})$')])],
      LicenseStartDate: [this.petrolPump.LicenseStartDate],
      LicenseEndDate: [this.petrolPump.LicenseEndDate],
      Country: [this.petrolPump.Country]
    });
    this.getAllStates();
    this.getUserInfo();
  }

  getUserInfo() {
    this.petrolPumpService.getUserDetail().subscribe((res) => {
      this.userData = res;
      this.DisableControlsByRoleID(this.userData.RoleID);
    }
    // ,
    //   (err) => {
    //     this.alertService.error(err);
    //   }
    );
  }

  DisableControlsByRoleID(roleID: number) {
    this.RoleID = roleID;
    // if (roleID != -2) {
    //   this.pumpInfoForm.controls["PetrolPumpName"].disable();
    //   this.pumpInfoForm.controls["OwnerName"].disable();
    //   this.pumpInfoForm.controls["Email"].disable();
    //   this.pumpInfoForm.controls["Mobile"].disable();
    // }
  }

  savePumpInfo() {
    this.petrolPumpService.updatePetrolPumpAdditionalInfo(this.pumpAdditionalInfoForm.value).subscribe(res => {
      this.toasterService.pop('success', '', 'Pump details updated successfully.');
      this.router.navigate(['/pumpDetails', this.petrolPump.PetrolPumpCode]);
      this.viewContainerRef[ '_data' ].componentView.parent.component.selectedTab=2;
    });
  }
  reset()
  {
    this.ngOnInit();
  }
  getAllStates() {
    this.petrolPumpService.getAllStates().subscribe(data => {
      this.states = data;
    });
  }
  checkFormValid() {
    if (this.pumpAdditionalInfoForm.controls['State'].value == 0) {
      this.validationStateMessage = "Please select State";
      return false;
    }
    else
    {
      this.validationStateMessage = "";
    }
  }
  onChange()
  {
    this.checkFormValid();
  }
}
