import { UserService } from '../_services/user.service';
import { Component, OnInit, NgModule, Output, EventEmitter, Input, Inject } from '@angular/core';
import { pp_User } from '../_models/pp_User';
import { FormsModule, FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms'
import { Role } from '../_models/Role';
import { Unit } from '../_models/Unit';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { PaymentType } from '../_models/PaymentType';
import { DatePipe } from '../../../node_modules/@angular/common';
import { CreditorInventory } from '../_models/CreditorInventory';
import { AllProduct } from '../AllProduct';

@Component({
  selector: 'creditorFuelRequestForm',
  templateUrl: './creditorFuelRequestForm.component.html',
  styleUrls: ['./creditorFuelRequestForm.component.css']
})
export class CreditorFuelRequestFormComponent implements OnInit {
  creditorInventory: CreditorInventory;
  units: Unit[];
  allProduct: AllProduct[];
  IsEditDialog: boolean;
  paymentTypes: PaymentType[];
  validationPaymentTypeMessage: string;
  btnDisabled: boolean = false;
  creditorFuelRequestForm: FormGroup;
  validationRoleMessage: string;
  public creditLimit: string;
  public purchaseLimit: string;
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
    'ConfirmPassword': [
      { type: 'required', message: 'Confirm Password is required' },
      { type: 'minlength', message: 'Confirm Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ],
    'UserId': [
      { type: 'required', message: 'UserId is required' },
      { type: 'minlength', message: 'UserId must be at least 5 characters long' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ],
    'FullName': [
      { type: 'required', message: 'Name is required' }
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
  constructor(private toasterService: ToasterService, public dialog: MatDialog, private router: Router, private userService: UserService, private _formBuilder: FormBuilder, private petrolPumpService: PetrolPumpService, @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<CreditorFuelRequestFormComponent>, public datepipe: DatePipe) {

  }

  ngOnInit() {
    this.creditorInventory = this.data.creditorInventory;
    this.creditLimit = this.data.creditLimit;
    // this.getAllRoles();
    // this.getAllPaymentType();
    this.creditorFuelRequestForm = this._formBuilder.group({
      ID: [this.creditorInventory.ID],
      PetrolPumpCode: [this.creditorInventory.PetrolPumpCode],
      ProductID: [this.creditorInventory.ProductID],
      ProductName: [this.creditorInventory.ProductName],
      PurchaseQuantity: [this.creditorInventory.PurchaseQuantity],
      SMSCode: [this.creditorInventory.SMSCode],
      Unit: [this.creditorInventory.Unit],
      UnitName: [this.creditorInventory.UnitName],
      CreatedBy: [this.creditorInventory.CreatedBy],
      CreatedOn: [this.creditorInventory.CreatedOn],
      CreditorID: [this.creditorInventory.CreditorID],
      DateMeasured: [this.creditorInventory.DateMeasured],
      Description: [this.creditorInventory.Description],
      ModifiedBy: [this.creditorInventory.ModifiedBy],
      ModifiedOn: [this.creditorInventory.ModifiedOn],
      IsApproved: [this.creditorInventory.IsApproved]
    });
    this.getAllUnits();
    this.getAllRegisteredProducts();
    if (this.creditorInventory.IsEditModal) {
      this.IsEditDialog = true;
      //this.userform.controls.UserId.disable();
    }
    else {
      this.IsEditDialog = false;
      //this.userform.controls.UserId.enable();
    }
    //this.DisableControlsByRole();
    // this.userform.controls["ConfirmPassword"].setValue(this.userform.controls["Password"].value);
    // let latest_PaymentDate = this.datepipe.transform(((this.user.PaymentDate == "" || this.user.PaymentDate == null) ? new Date().toString() : this.user.PaymentDate), 'yyyy-MM-dd');
    // this.userform.get('PaymentDate').setValue(latest_PaymentDate);

    // let latest_EncashementDate = this.datepipe.transform(((this.user.EncashementDate == "" || this.user.EncashementDate == null) ? new Date().toString() : this.user.EncashementDate), 'yyyy-MM-dd');
    // this.userform.get('EncashementDate').setValue(latest_EncashementDate);
  }
  // getAllPaymentType() {
  //   this.userService.getAllPaymentType().subscribe(data => {
  //     this.paymentTypes = data;
  //   });
  // }
  // onPaymentTypeChange() {
  //   let paymentTypeID = 0;
  //   paymentTypeID = this.userform.controls['PaymentTypeID'].value;
  //   this.checkFormValid();
  // }
  // matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  //   return (group: FormGroup): { [key: string]: any } => {
  //     let password = group.controls[passwordKey];
  //     let confirmPassword = group.controls[confirmPasswordKey];

  //     if (password.value !== confirmPassword.value) {
  //       return {
  //         mismatchedPasswords: true
  //       };
  //     }
  //   }
  // }
  checkFormValid() {
    // if (this.userform.controls['RoleID'].value == 0) {
    //   this.validationRoleMessage = "Please select Role";
    //   return false;
    // }
    // else{
    //   this.validationRoleMessage = "";
    // }
    // if (this.userform.controls['PaymentTypeID'].value == 0) {
    //   this.validationPaymentTypeMessage = "Please select Payment Type";
    //   return false;
    // }
    // else {
    //   this.validationPaymentTypeMessage = "";
    // }
    let status = 0;
    this.petrolPumpService.GetPetrolPumpCreditorPurchaseLimit(this.creditorFuelRequestForm.value).subscribe((res: any) => {
      if (res.Result < this.creditLimit) {
        status = 1;
      }      
    });
    if (status == 0) {
      this.toasterService.pop('error', '', "Your credit limit is low. please add funds or low your purchase limit.");
      return false;
    }
  }
  // getAllRoles() {
  //   this.userService.getAllRole().subscribe(data => {
  //     this.roles = data;
  //     this.roles = this.roles.filter(user => {
  //       return user.ID != 2;
  //     });
  //   });
  // }

  getPurchaseLimit(pumpCode) {
    this.petrolPumpService.GetPetrolPumpCreditorPurchaseLimit(this.creditorFuelRequestForm.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/FuelRequest', this.creditorInventory.PetrolPumpCode]);
    });
  }

  getAllUnits() {
    this.userService.getAllUnits().subscribe(data => {
      this.units = data;
    });
  }

  getAllRegisteredProducts() {
    this.userService.getAllRegisteredProducts(this.creditorInventory.PetrolPumpCode).subscribe(data => {
      this.allProduct = data;
    });
  }

  createUser() {
    this.petrolPumpService.AddUpdatePetrolPumpCreditorInventory(this.creditorFuelRequestForm.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/FuelRequest', this.creditorInventory.PetrolPumpCode]);
    });
  }

  // onChange() {
  //   this.DisableControlsByRole();
  //   this.checkFormValid();
  // }

  DisableControlsByRole() {
    // if (this.userform.controls['RoleID'].value == '2') { // 2 for Creditor
    //   this.userform.controls['CreditLimit'].enable();
    // }
    // else {
    //   this.userform.controls['CreditLimit'].disable();
    // }
  }

  // PasswordControlsVisbility() {
  //   if (this.userform.controls['isEditModal'].value == true) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

}
