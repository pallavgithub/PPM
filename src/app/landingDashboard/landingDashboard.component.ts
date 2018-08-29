import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { pp_PetrolPump } from '../_models/pp_PetrolPump';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { ToasterService } from 'angular2-toaster';
import { UserDetail } from '../_models/userDetail';
import { PumpStatus } from '../_models/PumpStatus';


@Component({
  selector: 'pump-landingDashboard',
  templateUrl: './landingDashboard.component.html',
  styleUrls: ['./landingDashboard.component.css']
})
export class LandingDashboardComponent implements OnInit {
  @Input() pumpStatus: PumpStatus[];
  @Input() pumpCode: string;
  status: string;
  countStatus: number;
  //public userData: UserDetail;
  //pumpLandingForm: FormGroup;
  //RoleID:number;
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
    ]
  }
  constructor(private toasterService: ToasterService, private _formBuilder: FormBuilder, private router: Router, private petrolPumpService: PetrolPumpService) {

  }

  ngOnInit() {
    if (this.pumpStatus && this.pumpStatus.length > 0) {
      if (this.pumpStatus[0].Payment == 1 && this.pumpStatus[0].Tank == 1 && this.pumpStatus[0].Nozzle == 1
        && this.pumpStatus[0].Product == 1 && this.pumpStatus[0].User == 1 && this.pumpStatus[0].AdditionalInfo == 1
        && this.pumpStatus[0].BasicInfo == 1) {
        this.status = "Petrol pump set up is 'Complete'."
        this.countStatus = 1;
      }
      else {
        this.status = "Petrol pump set up is 'In Progress'."
        this.countStatus = 0;
      }
    }
    // this.pumpLandingForm = this._formBuilder.group({
    //   PetrolPumpCode: [this.pumpStatus.PetrolPumpCode]      
    // });
    //this.getUserInfo();
  }

  //   savePumpInfo() {
  //     this.petrolPumpService.updatePetrolPumpInfo(this.pumpInfoForm.value).subscribe(res => {
  //       this.toasterService.pop('success', '', 'Pump details updated successfully.');
  //     });
  //   }
  //   getUserInfo() {
  //     this.petrolPumpService.getUserDetail().subscribe((res) => {
  //       this.userData = res;
  //       this.DisableControlsByRoleID(this.userData.RoleID);
  //     }
  // ,
  //   (err) => {
  //     this.alertService.error(err);
  //   }
  //     );
  //   }

  //   DisableControlsByRoleID(roleID: number) {
  //     this.RoleID = roleID;
  //     // if (roleID != -2) {
  //     //   this.pumpInfoForm.controls["PetrolPumpName"].disable();
  //     //   this.pumpInfoForm.controls["OwnerName"].disable();
  //     //   this.pumpInfoForm.controls["Email"].disable();
  //     //   this.pumpInfoForm.controls["Mobile"].disable();
  //     // }
  //   }
}
