import { UserService } from '../_services/user.service';
import { Component, OnInit, NgModule, Output, EventEmitter, Input, Inject } from '@angular/core';
import { AllProduct } from '../AllProduct';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { FormsModule, FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms'
import { PetrolPumpService } from '../_services/petrolpump.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { ProductWithCategory } from '../_models/ProductWithCategory';
import { Unit } from '../_models/Unit';
import { pp_Payment } from '../_models/pp_Payment';
import { PaymentType } from '../_models/PaymentType';
import { ReadingTypeDetail } from '../_models/readingTypeDetail';
import { ReadingType } from '../_models/ReadingType';
import { DatePipe } from '../../../node_modules/@angular/common';

@Component({
  selector: 'readingTypeDialogform',
  templateUrl: './readingTypeDialog.component.html',
  styleUrls: ['./readingTypeDialog.component.css']
})
export class ReadingTypeDialogFormComponent implements OnInit {
  pumpPayment: ReadingTypeDetail;
  //allProduct: ProductWithCategory[];
  //paymentTypes: PaymentType[];
  //divPaymentType: number;
  //allProduct:AllProduct[];
  //IsEditDialog: boolean;
  //btnDisabled: boolean = false;
  readingTypeDialogform: FormGroup;
  readingTypes: ReadingType[];
  validationReadingTypeMessage : string;
  validation_messages = {
    'ReadingDate': [
      { type: 'required', message: 'Reading Date is required' }
    ],
    'OpeningReading': [
      { type: 'required', message: 'Opening Reading is required' },
      { type: 'pattern', message: 'Only Numbers are allowed.' }
    ],
    'UserId': [
      { type: 'required', message: 'UserId is required' },
      { type: 'minlength', message: 'UserId must be at least 5 characters long' }
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
    private dialogRef: MatDialogRef<ReadingTypeDialogFormComponent>, public datepipe: DatePipe) {

  }

  ngOnInit() {
    this.pumpPayment = this.data.readingTypeDetailTemp;

    this.readingTypeDialogform = this._formBuilder.group({
      ReadingDate: [this.pumpPayment.ReadingDate, Validators.compose([Validators.required])],
      ReadingType: [this.pumpPayment.ReadingType],
      OpeningReading: [this.pumpPayment.OpeningReading, Validators.compose([Validators.required])],
      ID: [this.pumpPayment.ID],
      PetrolPumpCode : [this.pumpPayment.PetrolPumpCode]
    });
    let latest_ReadingDate = this.datepipe.transform(((this.pumpPayment.ReadingDate == "" || this.pumpPayment.ReadingDate == null ) ? new Date().toString() : this.pumpPayment.ReadingDate), 'yyyy-MM-dd');
    this.readingTypeDialogform.get('ReadingDate').setValue(latest_ReadingDate);
    this.getReadingType();
  }

  checkFormValid() {
    if (this.readingTypeDialogform.controls['ReadingType'].value == 0) {
      this.validationReadingTypeMessage = "Please select Reading Type";
      return false;
    }
    else {
      this.validationReadingTypeMessage = "";
    }
  }

  createPayment() {
    this.readingTypeDialogform.controls["OpeningReading"].setValue(Number(this.readingTypeDialogform.controls["OpeningReading"].value));
    this.dialogRef.close({ 
      data: this.readingTypeDialogform.value 
    });
    // this.petrolPumpService.addUpdatePumpPayment(this.readingTypeDialogform.value).subscribe((res: any) => {
    //   this.toasterService.pop('success', '', res.Result.toString());
      
    //   //this.router.navigate(['/pumpDetails', this.pumpPayment.PetrolPumpCode]);
    // });
  }
  getReadingType() {
    this.userService.getReadingType().subscribe(data => {
      this.readingTypes = data;
    });
  }
}
