import { UserService } from './user.service';
import { pp_Nozzle } from "../_models/pp_Nozzle";
import { Injectable } from "@angular/core";

// import { FormData, Personal, Address }       from './formData.model';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { PetrolPumpRegister } from "../_models/PetrolPumpRegister";
import { pumpDataModel } from "../_models/pumpDataModel";
import { pp_PetrolPump } from "../_models/pp_PetrolPump";
import { pp_User } from "../_models/pp_User";
import { pp_Tank } from "../_models/pp_Tank";
import { Router } from '@angular/router';

@Injectable()
export class FormDataService {
  public formData: pumpDataModel = new pumpDataModel();
  private isPersonalFormValid: boolean = false;
  private isWorkFormValid: boolean = false;
  private isAddressFormValid: boolean = false;

  constructor(private workflowService: WorkflowService,private userService:UserService,private route:Router) {}

  getPumpRegisterData(): PetrolPumpRegister {
    return this.formData.petrolPumpRegister;
  }

  setPumpRegisterData(data: PetrolPumpRegister) {
    this.formData.petrolPumpRegister = data;
    this.workflowService.validateStep(STEPS.pumpRegister);
  }

  getPumpInfoData(): pp_PetrolPump {
    this.formData.pp_PetrolPump.PetrolPumpPincode = this.formData.petrolPumpRegister.PetrolPumpPincode;    
    this.formData.pp_PetrolPump.PetrolPumpName = this.formData.petrolPumpRegister.PetrolPumpName;
    return this.formData.pp_PetrolPump;
  }

  setPumpInfoData(data: pp_PetrolPump) {
    this.formData.pp_PetrolPump = data;
    console.log(this.formData);
    this.workflowService.validateStep(STEPS.pumpInfo);
  }

  getPumpUsersData(): pp_User[] {
    return this.formData.pp_User;
  }

  setPumpUsersData(data: pp_User[]) {
    if (this.formData.petrolPumpUserMap.UserId == null || this.formData.petrolPumpUserMap.UserId == "")
      this.formData.petrolPumpUserMap.UserId = data[0].UserId;
    this.formData.pp_User = data;
    this.workflowService.validateStep(STEPS.pumpUsers);
  }

  setPumpTankData(data: pp_Tank[]) {
    this.formData.pp_Tank = data;
    this.workflowService.validateStep(STEPS.pumpTanks);    
  }
  
  submitPumpData(){
    console.log(JSON.stringify(this.formData));
   var res= this.userService.submitPumpData(this.formData).subscribe((res)=>{
           
      },(err)=>{
          
      });
      return res;
  }
  getPumpTankData(): pp_Tank[] {
    return this.formData.pp_Tank;
  }

  // getPumpNozzleData():pp_Nozzle[]{
  //     return this.formData.nozzleData;
  // }

  // setPumpNozzleData(data:pp_Nozzle[]){
  //     this.formData.nozzleData=data;
  //    // this.workflowService.validateStep(STEPS.nozzles);
  // }
  // getWork() : string {
  //     // Return the work type
  //     return this.formData.work;
  // }

  // setWork(data: string) {
  //     // Update the work type only when the Work Form had been validated successfully
  //     this.isWorkFormValid = true;
  //     this.formData.work = data;
  //     // Validate Work Step in Workflow
  //     this.workflowService.validateStep(STEPS.work);
  // }

  // getAddress() : Address {
  //     // Return the Address data
  //     var address: Address = {
  //         street: this.formData.street,
  //         city: this.formData.city,
  //         state: this.formData.state,
  //         zip: this.formData.zip
  //     };
  //     return address;
  // }

  // setAddress(data: Address) {
  //     // Update the Address data only when the Address Form had been validated successfully
  //     this.isAddressFormValid = true;
  //     this.formData.street = data.street;
  //     this.formData.city = data.city;
  //     this.formData.state = data.state;
  //     this.formData.zip = data.zip;
  //     // Validate Address Step in Workflow
  //     this.workflowService.validateStep(STEPS.address);
  // }

  // getFormData(): FormData {
  //     // Return the entire Form Data
  //     return this.formData;
  // }

  // resetFormData(): FormData {
  //     // Reset the workflow
  //     this.workflowService.resetSteps();
  //     // Return the form data after all this.* members had been reset
  //     this.formData.clear();
  //     this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
  //     return this.formData;
  // }

  // isFormValid() {
  //     // Return true if all forms had been validated successfully; otherwise, return false
  //     return this.isPersonalFormValid &&
  //             this.isWorkFormValid &&
  //             this.isAddressFormValid;
  // }
}
