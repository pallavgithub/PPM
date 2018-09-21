import { UserService } from '../_services/user.service';
import { Component, OnInit, NgModule, Output, EventEmitter, Input, Inject } from '@angular/core';
import { pp_User } from '../_models/pp_User';
import { FormsModule, FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms'
import { Role } from '../_models/Role';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { PaymentType } from '../_models/PaymentType';
import { DatePipe } from '../../../node_modules/@angular/common';

@Component({
  selector: 'creditorform',
  templateUrl: './creditorform.component.html',
  styleUrls: ['./creditorform.component.css']
})
export class CreditorformComponent implements OnInit {
  user: pp_User;
  roles: Role[];
  IsEditDialog: boolean;
  paymentTypes: PaymentType[];
  validationPaymentTypeMessage: string;
  errorMessagePassword: string;
  btnDisabled: boolean = false;
  userform: FormGroup;
  validationRoleMessage: string;
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
    private dialogRef: MatDialogRef<CreditorformComponent>, public datepipe: DatePipe) {

  }

  ngOnInit() {
    this.user = this.data.user;
    this.getAllRoles();
    this.getAllPaymentType();
    this.userform = this._formBuilder.group({
      ID: [this.user.ID],
      PetrolPumpCode: [this.user.PetrolPumpCode],
      UserId: [this.user.UserId, Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9@&!-_.]*$')])],
      Password: [this.user.Password, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9@&!-_.]*$')])],
      ConfirmPassword: [this.user.ConfirmPassword, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9@&!-_.]*$')])],
      FullName: [this.user.FullName, Validators.compose([Validators.required, Validators.minLength(3)])],
      Address: [this.user.Address],
      RoleID: [this.user.RoleID, Validators.compose([Validators.required])],
      Phone: [this.user.Phone, Validators.compose([Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^[0-9]*$')])],
      Email: [this.user.Email, Validators.compose([Validators.email])],
      CreditLimit: [this.user.CreditLimit, Validators.compose([Validators.required])],
      Description: [this.user.Description],
      isEditModal: [this.user.IsEditModal],
      PaymentDate: [this.user.PaymentDate, Validators.compose([Validators.required])],
      EncashementDate: [this.user.EncashementDate, Validators.compose([Validators.required])],
      IsEncashed: [this.user.IsEncashed],
      PaymentTypeID: [this.user.PaymentTypeID]
    }, { validator: this.matchingPasswords('Password', 'ConfirmPassword') });
    if (this.user.IsEditModal) {
      this.IsEditDialog = true;
      //this.userform.controls.UserId.disable();
    }
    else {
      this.IsEditDialog = false;
      //this.userform.controls.UserId.enable();
    }
    this.DisableControlsByRole();
    this.userform.controls["ConfirmPassword"].setValue(this.userform.controls["Password"].value);
    let latest_PaymentDate = this.datepipe.transform(((this.user.PaymentDate == "" || this.user.PaymentDate == null) ? new Date().toString() : this.user.PaymentDate), 'yyyy-MM-dd');
    this.userform.get('PaymentDate').setValue(latest_PaymentDate);

    let latest_EncashementDate = this.datepipe.transform(((this.user.EncashementDate == "" || this.user.EncashementDate == null) ? new Date().toString() : this.user.EncashementDate), 'yyyy-MM-dd');
    this.userform.get('EncashementDate').setValue(latest_EncashementDate);
  }
  getAllPaymentType() {
    this.userService.getAllPaymentType().subscribe(data => {
      this.paymentTypes = data;
    });
  }
  onPaymentTypeChange() {
    let paymentTypeID = 0;
    paymentTypeID = this.userform.controls['PaymentTypeID'].value;
    this.checkFormValid();
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        this.errorMessagePassword = "Password Mismatch";
        return {
          mismatchedPasswords: true
        };
      }
      else {
        this.errorMessagePassword = "";
      }
    }
  }
  checkFormValid() {
    // if (this.userform.controls['RoleID'].value == 0) {
    //   this.validationRoleMessage = "Please select Role";
    //   return false;
    // }
    // else{
    //   this.validationRoleMessage = "";
    // }
    if (this.userform.controls['PaymentTypeID'].value == 0) {
      this.validationPaymentTypeMessage = "Please select Payment Type";
      return false;
    }
    else {
      this.validationPaymentTypeMessage = "";
    }
  }
  getAllRoles() {
    this.userService.getAllRole().subscribe(data => {
      this.roles = data;
      this.roles = this.roles.filter(user => {
        return user.ID != 2;
      });
    });
  }

  createUser() {
    this.userform.controls["RoleID"].setValue(2);
    this.userform.controls["CreditLimit"].setValue(Number(this.userform.controls["CreditLimit"].value));
    this.petrolPumpService.addUpdatePumpUser(this.userform.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/Creditor', this.user.PetrolPumpCode]);
    });
  }

  onChange() {
    this.DisableControlsByRole();
    this.checkFormValid();
  }

  DisableControlsByRole() {
    // if (this.userform.controls['RoleID'].value == '2') { // 2 for Creditor
    //   this.userform.controls['CreditLimit'].enable();
    // }
    // else {
    //   this.userform.controls['CreditLimit'].disable();
    // }
  }

  PasswordControlsVisbility() {
    if (this.userform.controls['isEditModal'].value == true) {
      return true;
    }
    else {
      return false;
    }
  }

}
