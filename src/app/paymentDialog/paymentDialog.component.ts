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

@Component({
  selector: 'paymentDialogform',
  templateUrl: './paymentDialog.component.html',
  styleUrls: ['./paymentDialog.component.css']
})
export class PaymentDialogFormComponent implements OnInit {
  pumpPayment: pp_Payment;
  //allProduct: ProductWithCategory[];
  paymentTypes: PaymentType[];
  divPaymentType: number;
  //allProduct:AllProduct[];
  IsEditDialog: boolean;
  btnDisabled: boolean = false;
  paymentDialogform: FormGroup;
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
    private dialogRef: MatDialogRef<PaymentDialogFormComponent>) {

  }

  ngOnInit() {
    this.pumpPayment = this.data.pumpPaymentNew;
    this.divPaymentType = 0;
    if (this.pumpPayment.IsEditModal == true) {
      this.IsEditDialog = true;
    }
    else {
      this.IsEditDialog = false;
    }
    // this.getAllProducts();
    this.getAllPaymentType();
    this.DisableControlsByRole(this.pumpPayment.PaymentTypeID);

    this.paymentDialogform = this._formBuilder.group({
      ID: [this.pumpPayment.ID],
      PetrolPumpCode: [this.pumpPayment.PetrolPumpCode],
      BankName: [this.pumpPayment.BankName],
      BankCode: [this.pumpPayment.BankCode],
      ChequeNumber: [this.pumpPayment.ChequeNumber],
      CreatedBy: [this.pumpPayment.CreatedBy],
      CreatedOn: [this.pumpPayment.CreatedOn],
      DraftNumber: [this.pumpPayment.DraftNumber],
      IsEditModal: [this.pumpPayment.IsEditModal],
      ModifiedBy: [this.pumpPayment.ModifiedBy],
      ModifiedOn: [this.pumpPayment.ModifiedOn],
      PaymentTypeCode: [this.pumpPayment.PaymentTypeCode],
      PaymentTypeID: [this.pumpPayment.PaymentTypeID],
      WalletNumber: [this.pumpPayment.WalletNumber]
    });
    // this.DisableControlsByRole();
  }

  // getAllProducts() {
  //   this.userService.getAllProductsWithCategory().subscribe(data => {
  //     this.allProduct = data;
  //   });
  // }
  getAllPaymentType() {
    this.userService.getAllPaymentType().subscribe(data => {
      this.paymentTypes = data;
    });
  }
  // getAllProducts()
  // {
  //   this.userService.getAllProducts().subscribe(data=>{      
  //     this.allProduct=data;
  //   });
  // }

  createPayment() {
    this.petrolPumpService.addUpdatePumpPayment(this.paymentDialogform.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/pumpDetails', this.pumpPayment.PetrolPumpCode]);
    });
  }

  onChange() {
    let paymentTypeID = 0;
    paymentTypeID = this.paymentDialogform.controls['PaymentTypeID'].value;
    this.DisableControlsByRole(paymentTypeID);
  }

  DisableControlsByRole(paymentTypeID: number) {

    if (paymentTypeID == 5) { // Cheque
      this.divPaymentType = 1;
    }
    else if (paymentTypeID == 6) { // Draft
      this.divPaymentType = 2;
    }
    else if (paymentTypeID == 3 || paymentTypeID == 4) { // Wallet
      this.divPaymentType = 3;
    }
    else {
      this.divPaymentType = 0;
    }
  }

  // GetCategoryID()
  // {
  //   let categoryID = 0;
  //   this.allProduct.forEach(element => {
  //     element.pumpProducts.forEach(element => {
  //       if (element.ID == this.productDialogform.controls['ProductID'].value) {
  //         categoryID = element.CategoryID;
  //       }
  //     });
  //   });
  //   return categoryID;
  // }

  // GetCategoryByProductID(productID:number)
  // {
  //   let categoryID = 0;
  //   this.allProduct.forEach(element => {
  //     element.pumpProducts.forEach(element => {
  //       if (element.ID == productID) {
  //         categoryID = element.CategoryID;
  //       }
  //     });
  //   });
  //   return categoryID;
  // }

  // PasswordControlsVisbility()
  // {if (this.productDialogform.controls['isEditModal'].value==true) { 
  //   return true;
  // }
  // else{
  //   return false;
  // }
  // }

}
