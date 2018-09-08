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
import { pp_Tank } from '../_models/pp_Tank';

@Component({
  selector: 'tankLedgerform',
  templateUrl: './tankLedger.component.html',
  styleUrls: ['./tankLedger.component.css']
})
export class TankLedgerformComponent implements OnInit {
  pumpTanksLedger: pp_Tank[];
  roles: Role[];
  nozzle: Role[];
  IsEditDialog: boolean;
  paymentTypes: PaymentType[];
  validationPaymentTypeMessage: string;
  errorMessagePassword: string;
  validationNozzleMessage :string;
  btnDisabled: boolean = false;
  userform: FormGroup;
  validationRoleMessage: string;
  tankName:String;
  tankOpeningStock:number;
  tankClosingStock:number;
  pageNumber: number = 1;
  indexValue: number = 1;
  key: string = 'name'; //set default
  reverse: boolean = false;
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
      { type: 'required', message: 'Creditor Id is required' },
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
    private dialogRef: MatDialogRef<TankLedgerformComponent>, public datepipe: DatePipe) {

  }
  ngOnInit() {
    
    this.pumpTanksLedger = this.data.user;
    this.tankName=this.data.user[0].TankName;
    this.tankOpeningStock=this.data.user[0].OpeningStock;
    this.tankClosingStock=this.data.user[this.data.user.length-1].ClosingStock;
    this.pumpTanksLedger.forEach(element => {
      element.ReadingDate = this.datepipe.transform((new Date(element.ReadingDate).toString()), 'yyyy-MM-dd');
    });
  }
  paginate(event) {
    this.pageNumber = event;
    this.indexValue = event > 0 ? 10 * (event - 1) + 1 : 1;
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
