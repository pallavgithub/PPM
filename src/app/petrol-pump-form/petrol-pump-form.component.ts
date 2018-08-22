import { pp_Tank } from "../_models/pp_Tank";
import { pp_Nozzle } from "../_models/pp_Nozzle";
import { pp_User } from "../_models/pp_User";
import { pp_PetrolPump } from "../_models/pp_PetrolPump";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { PetrolPumpRegister } from "../_models/PetrolPumpRegister";
import { PetrolPumpUserMap } from "../_models/PetrolPumpUserMap";

@Component({
  selector: "app-petrol-pump-form",
  templateUrl: "./petrol-pump-form.component.html",
  styleUrls: ["./petrol-pump-form.component.css"]
})
export class PetrolPumpFormComponent implements OnInit {
  isLinear = false;

  // public registerModel:PetrolPumpRegister=new PetrolPumpRegister();
  // public pumpAdminModel:PetrolPumpUserMap=new PetrolPumpUserMap();
  // public pumpInfoModel:pp_PetrolPump=new pp_PetrolPump();
  // public pumpUser:pp_User=new pp_User();
  // public tankModel:pp_Tank=new pp_Tank();
  // public nozzleModel:pp_Nozzle=new pp_Nozzle();

  registerForm: FormGroup;
  pumpAdminForm: FormGroup;
  pumpInfoForm: FormGroup;
  pumpUserForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      PetrolPumpCode: [null],
      PetrolPumpName: [null, Validators.required],
      PetrolPumpPincode: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(100000),
          Validators.max(999999)
        ])
      ]
    });
    this.pumpAdminForm = this._formBuilder.group({
      PetrolPumpCode: [null],
      UserId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ])
      ]
    });
    this.pumpInfoForm = this._formBuilder.group({
      PumpCode: [null],
      PumpName: [null],
      OwnerName: [null, Validators.required],
      Logo: [null, Validators.required],
      Address: [null, Validators.required],
      Pincode: [null, Validators.required],
      Mobile: [null, Validators.required],
      Email: [null, Validators.required],
      TIN: [null, Validators.required],
      CST: [null, Validators.required],
      StartDate: [null, Validators.required],
      EndDate: [null, Validators.required]
    });

    this.pumpUserForm = this._formBuilder.group({
      users: this._formBuilder.array([this.initUser()])
    });
  }
  initUser() {
    return this._formBuilder.group({
      UserId: [null, Validators.required],
      Password: [null, Validators.required],
      PumpCode: [null],
      FullName: [null, Validators.required],
      Email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      RoleID: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      Phone: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      Address: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      CreditLimit: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      Description: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ]
    });
  }
  submitRegister() {
    console.log(this.registerForm.value);
  }

  submitPumpAdmin() {
    console.log(this.pumpAdminForm.value);
  }

  submitPumpInfo() {
    console.log(this.pumpInfoForm.value);
  }
  submitPumpUsers() {
    console.log(this.pumpUserForm.value);
  }
  
  addUser() {
    const control = <FormArray>this.pumpUserForm.controls["users"];
    control.push(this.initUser());
  }

  removeUser(i: number) {
    const control = <FormArray>this.pumpUserForm.controls["users"];
    control.removeAt(i);
  }
}
