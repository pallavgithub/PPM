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
  validationPaymentTypeMessage : string;
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
    private dialogRef: MatDialogRef<ReadingTypeDialogFormComponent>) {

  }

  ngOnInit() {
    this.pumpPayment = this.data.readingTypeDetailTemp;

    this.readingTypeDialogform = this._formBuilder.group({
      ReadingDate: [this.pumpPayment.ReadingDate],
      ReadingType: [this.pumpPayment.ReadingType],
      OpeningReading: [this.pumpPayment.OpeningReading],
      ID: [this.pumpPayment.ID],
      PetrolPumpCode : [this.pumpPayment.PetrolPumpCode]
    });
    this.getReadingType();
  }

  createPayment() {
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
