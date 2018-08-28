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
import { DatePipe } from '../../../node_modules/@angular/common';

@Component({
  selector: 'productDialogform',
  templateUrl: './productDialog.component.html',
  styleUrls: ['./productDialog.component.css']
})
export class ProductDialogFormComponent implements OnInit {
  pumpProduct: pp_PumpProduct;
  allProduct: ProductWithCategory[];
  units: Unit[]
  divCategory: number;
  //allProduct:AllProduct[];
  IsEditDialog: boolean;
  btnDisabled: boolean = false;
  productDialogform: FormGroup;
  validationProductIDMessage: string;
  validationUnitMessage: string;
  isInitials:boolean;
  validation_messages = {
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'ProductID': [
      { type: 'required', message: 'ProductID is required' }
    ],
    'UserId': [
      { type: 'required', message: 'UserId is required' },
      { type: 'minlength', message: 'UserId must be at least 5 characters long' }
    ],
    'InitialQuantity': [
      { type: 'required', message: 'Initial Quantity is required' }
    ],
    'InitialReading': [
      { type: 'required', message: 'Initial Reading is required' }
    ],
    'PurchaseRate': [
      { type: 'required', message: 'Purchase Rate is required' }
    ],
    'PurchaseDate': [
      { type: 'required', message: 'Purchase Date is required' }
    ],
    'SaleRate': [
      { type: 'required', message: 'Sale Rate is required' }
    ],
    'SaleDate': [
      { type: 'required', message: 'Sale Date is required' }
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
    private dialogRef: MatDialogRef<ProductDialogFormComponent>, public datepipe: DatePipe) {

  }

  ngOnInit() {
    this.pumpProduct = this.data.pumpProductNew;
    this.divCategory = 0;
    this.isInitials = true;
    if (this.pumpProduct.IsEditModal == true) {
      this.IsEditDialog = true;
    }
    else {
      this.IsEditDialog = false;
    }
    this.getAllProducts();
    this.getAllUnits();
    this.DisableControlsByRole(this.pumpProduct.CategoryID,this.pumpProduct.ProductID);

    this.productDialogform = this._formBuilder.group({
      ID: [this.pumpProduct.ID],
      PetrolPumpCode: [this.pumpProduct.PetrolPumpCode],
      ProductID: [this.pumpProduct.ProductID],
      InitialQuantity: [this.pumpProduct.InitialQuantity],
      PurchaseQuantity: [this.pumpProduct.PurchaseQuantity],
      Unit: [this.pumpProduct.Unit],
      PurchaseRate: [this.pumpProduct.PurchaseRate,Validators.compose([Validators.required,Validators.pattern('^[0-9.]*$')])],
      SaleRate: [this.pumpProduct.SaleRate,Validators.compose([Validators.required,Validators.pattern('^[0-9.]*$')])],
      Description: [this.pumpProduct.Description],
      CreatedBy: [this.pumpProduct.CreatedBy],
      CreatedOn: [this.pumpProduct.CreatedOn],
      ModifiedBy: [this.pumpProduct.ModifiedBy],
      ModifiedOn: [this.pumpProduct.ModifiedOn],
      isEditModal: [this.pumpProduct.IsEditModal],
      ProductCode: [this.pumpProduct.ProductCode],
      PurchaseDate: [this.pumpProduct.PurchaseDate],
      SaleDate: [this.pumpProduct.SaleDate],
      DateStockMeasuredOn: [this.pumpProduct.DateStockMeasuredOn],
      CategoryID: [this.pumpProduct.CategoryID]
    });
    let latest_PurchaseDate = this.datepipe.transform(((this.pumpProduct.PurchaseDate == "" || this.pumpProduct.PurchaseDate == null ) ? new Date().toString() : this.pumpProduct.PurchaseDate), 'yyyy-MM-dd');
    this.productDialogform.get('PurchaseDate').setValue(latest_PurchaseDate);

    let latest_SaleDate = this.datepipe.transform(((this.pumpProduct.SaleDate == "" || this.pumpProduct.SaleDate == null ) ? new Date().toString() : this.pumpProduct.SaleDate), 'yyyy-MM-dd');
    this.productDialogform.get('SaleDate').setValue(latest_SaleDate);
    // this.DisableControlsByRole();
  }
  checkFormValid() {
    if (this.productDialogform.controls['ProductID'].value == 0) {
      this.validationProductIDMessage = "Please select Product ID";
      return false;
    }
    else
    {
      this.validationProductIDMessage = "";
    }
    let categoryID = 0;
    categoryID = this.GetCategoryByProductID(this.productDialogform.controls['ProductID'].value);
    if (categoryID == 1 || categoryID == 2) {
      if (this.productDialogform.controls['Unit'].value == 0) {
        this.validationUnitMessage = "Please select Unit";
        return false;
      }
      else{
        this.validationUnitMessage = "";
      }
    }
  }
  getAllProducts() {
    this.userService.getAllProductsWithCategory().subscribe(data => {
      this.allProduct = data;
    });
  }
  getAllUnits() {
    this.userService.getAllUnits().subscribe(data => {
      this.units = data;
    });
  }
  // getAllProducts()
  // {
  //   this.userService.getAllProducts().subscribe(data=>{      
  //     this.allProduct=data;
  //   });
  // }

  createProduct() {
    this.productDialogform.controls["PurchaseRate"].setValue(Number(this.productDialogform.controls["PurchaseRate"].value));
    this.productDialogform.controls["SaleRate"].setValue(Number(this.productDialogform.controls["SaleRate"].value));
    if(this.productDialogform.controls["InitialQuantity"].value == "")
    {
      this.productDialogform.controls["InitialQuantity"].setValue(0);
    }
    else
    {
      this.productDialogform.controls["InitialQuantity"].setValue(Number(this.productDialogform.controls["InitialQuantity"].value));
    }
    
    this.petrolPumpService.addUpdatePumpProduct(this.productDialogform.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/pumpDetails', this.pumpProduct.PetrolPumpCode]);
    });
  }

  onChange() {
    let categoryID = 0;
    let productID =this.productDialogform.controls['ProductID'].value;
    categoryID = this.GetCategoryID();
    this.DisableControlsByRole(categoryID,productID);
    this.checkFormValid();
  }

  DisableControlsByRole(categoryID: number, productID:number) {

    if (categoryID == 1) { // Standard
      // this.productDialogform.controls['Quantity'].enable();
      this.isInitials = false;
      // if(productID == 5) // 5 for cng
      // {
      //   this.isInitials = false;
      // }
      // else
      // {
      //   this.isInitials = true;
      // }
      this.divCategory = 1;
    }
    else if (categoryID == 2) {      
      this.divCategory = 2;
      // this.productDialogform.controls['Quantity'].disable();
      
    }
    else {
      // this.productDialogform.controls['Quantity'].disable();
      this.divCategory = 3;
    }
  }

  GetCategoryID() {
    let categoryID = 0;
    this.allProduct.forEach(element => {
      element.pumpProducts.forEach(element => {
        if (element.ID == this.productDialogform.controls['ProductID'].value) {
          categoryID = element.CategoryID;
        }
      });
    });
    return categoryID;
  }

  GetCategoryByProductID(productID: number) {
    let categoryID = 0;
    this.allProduct.forEach(element => {
      element.pumpProducts.forEach(element => {
        if (element.ID == productID) {
          categoryID = element.CategoryID;
        }
      });
    });
    return categoryID;
  }

  // PasswordControlsVisbility()
  // {if (this.productDialogform.controls['isEditModal'].value==true) { 
  //   return true;
  // }
  // else{
  //   return false;
  // }
  // }

}
