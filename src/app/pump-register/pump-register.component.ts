import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PetrolPumpRegister } from '../_models/PetrolPumpRegister';
import { Router } from '@angular/router';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'pump-register',
  templateUrl: './pump-register.component.html',
  styleUrls: ['./pump-register.component.css']
})
export class PumpRegisterComponent implements OnInit {
  registerForm: FormGroup;
  public petrolPumpRegister: PetrolPumpRegister=new PetrolPumpRegister();
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

  constructor(private _formBuilder: FormBuilder,private toasterService: ToasterService,private router: Router,private petrolPumpService: PetrolPumpService) { 

  }

  ngOnInit() {  
      this.registerForm = this._formBuilder.group({
        PetrolPumpName: [this.petrolPumpRegister.PetrolPumpName,Validators.compose([ Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9@&]*$')])],
        PetrolPumpPincode:[this.petrolPumpRegister.PetrolPumpPincode,Validators.compose([ Validators.pattern('^(\\s*|\\d{6,6})$')])],
        OwnerName: [this.petrolPumpRegister.OwnerName,Validators.compose([ Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9\\s]*$')])],
        Logo: [this.petrolPumpRegister.Logo],
        Address: [this.petrolPumpRegister.Address],
        Mobile: [this.petrolPumpRegister.Mobile, Validators.compose([ Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern('^[0-9]*$')])],
        Email: [this.petrolPumpRegister.Email,Validators.compose([Validators.required,Validators.email])],
        TIN: [this.petrolPumpRegister.TIN, Validators.compose([ Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^[0-9]*$')])],
        CST: [this.petrolPumpRegister.CST, Validators.compose([ Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^[0-9]*$')])],
        LicenseStartDate: [this.petrolPumpRegister.LicenseStartDate],
        LicenseEndDate: [this.petrolPumpRegister.LicenseEndDate],
        Password:[this.petrolPumpRegister.Password,Validators.compose([ Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z0-9@&!-_.]*$')])],
        ConfirmPassword:[this.petrolPumpRegister.ConfirmPassword,Validators.compose([Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z0-9@&!-_.]*$')])]
  },{validator: this.matchingPasswords('Password', 'ConfirmPassword')})
}

matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}
  
  submitRegister() {    
    this.petrolPumpRegister=this.registerForm.value;
    console.log(JSON.stringify(this.petrolPumpRegister));
    this.petrolPumpService.register(this.petrolPumpRegister).subscribe(
      (res)=>{
        this.toasterService.pop('success','','Pump registered successfully.');
        this.router.navigate([""]);
    },
    (err)=>{
    });
  }
  cancel(){
    this.router.navigate([""]);
  }
}
