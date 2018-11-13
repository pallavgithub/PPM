import { UserService } from '../_services/user.service';
import { Component, OnInit, NgModule, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms'
import { Role } from '../_models/Role';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { PaymentType } from '../_models/PaymentType';
import { DatePipe } from '../../../node_modules/@angular/common';
import { pp_Tank } from '../_models/pp_Tank';
import { pp_Nozzle } from '../_models/pp_Nozzle';

@Component({
  selector: 'nozzleLedgerform',
  templateUrl: './nozzle-ledger-form.component.html',
  styleUrls: ['./nozzle-ledger-form.component.css']
})
export class NozzleLedgerformComponent implements OnInit {
  pumpTanksLedger: pp_Tank[];
  pumpNozzleLedger: pp_Nozzle[];
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
  nozzleName:String;
  nozzleOpeningReading:number;
  pageNumber: number = 1;
  indexValue: number = 1;
  
  constructor(private toasterService: ToasterService, public dialog: MatDialog, private router: Router, private userService: UserService, private _formBuilder: FormBuilder, private petrolPumpService: PetrolPumpService, @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<NozzleLedgerformComponent>, public datepipe: DatePipe) {

  }
  ngOnInit() {
    this.pumpNozzleLedger = this.data.nozzle;
    this.nozzleName=this.data.nozzle[0].NozzleName;
    this.nozzleOpeningReading=this.data.nozzle[0].OpeningReading;
    this.pumpNozzleLedger.forEach(element => {
      element.ReadingDate = this.datepipe.transform((new Date(element.ReadingDate).toString()), 'yyyy-MM-dd');
    });
  }
  paginate(event) {
    this.pageNumber = event;
    this.indexValue = event > 0 ? 10 * (event - 1) + 1 : 1;
  }
}
