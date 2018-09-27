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
import { pp_Tank } from '../_models/pp_Tank';
import { TankWithProduct } from '../_models/TankWithProduct';

@Component({
  selector: 'inventoryFuelTankDialogform',
  templateUrl: './inventoryFuelTankDialog.component.html',
  styleUrls: ['./inventoryFuelTankDialog.component.css']
})
export class InventoryFuelTankDialogFormComponent implements OnInit {
  pumpProduct: pp_PumpProduct;
  allProduct: ProductWithCategory[];
  pumpTanks: pp_Tank[];
  pumpCode:string;
  TankerID: number;
  units: Unit[]
  divCategory: number;
  tankWithProduct:TankWithProduct;
  //allProduct:AllProduct[];
  IsEditDialog: boolean;
  IsTwelve: boolean;
  IsEIghteen: boolean;
  IsTankerSelected: boolean;
  DateOfEntry: string;
  btnDisabled: boolean = false;
  inventoryFuelTankDialogform: FormGroup;
  validationProductIDMessage: string;
  validationTankerMessage: string;
  validationTankStockMessage: string;
  validationUnitMessage: string;
  isInitials: boolean;
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
      { type: 'required', message: 'Please add stock' }
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
    private dialogRef: MatDialogRef<InventoryFuelTankDialogFormComponent>, public datepipe: DatePipe) {

  }

  ngOnInit() {
    this.pumpProduct = this.data.pumpProductNew;
    this.pumpTanks = this.data.pumpTanks;
    this.pumpTanks = this.pumpTanks.filter(p=>p.ProductName == this.pumpProduct.ProductName);
    this.pumpCode = this.data.pumpCode;
    this.divCategory = 0;
    this.isInitials = true;
    this.tankWithProduct = new TankWithProduct();
    this.IsTwelve = false;
    this.IsEIghteen = false;
    this.IsTankerSelected = false;
    this.TankerID = 0;
    if (this.pumpProduct.IsEditModal == true) {
      this.IsEditDialog = true;
    }
    else {
      this.IsEditDialog = false;
    }
    this.DateOfEntry = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    // this.getAllProducts();
    // this.getAllUnits();
    this.DisableControlsByRole(this.pumpProduct.CategoryID, this.pumpProduct.ProductID);

    this.pumpTanks.forEach(element => {
      element.Stock = 0
    });

    // this.inventoryFuelTankDialogform = this._formBuilder.group({
    //   ID: [this.pumpProduct.ID],
    //   PetrolPumpCode: [this.pumpProduct.PetrolPumpCode],
    //   ProductID: [this.pumpProduct.ProductID],
    //   InitialQuantity: [this.pumpProduct.InitialQuantity],
    //   PurchaseQuantity: [this.pumpProduct.PurchaseQuantity],
    //   Unit: [this.pumpProduct.Unit],
    //   PurchaseRate: [this.pumpProduct.PurchaseRate],
    //   SaleRate: [this.pumpProduct.SaleRate],
    //   Description: [this.pumpProduct.Description],
    //   CreatedBy: [this.pumpProduct.CreatedBy],
    //   CreatedOn: [this.pumpProduct.CreatedOn],
    //   ModifiedBy: [this.pumpProduct.ModifiedBy],
    //   ModifiedOn: [this.pumpProduct.ModifiedOn],
    //   isEditModal: [this.pumpProduct.IsEditModal],
    //   ProductCode: [this.pumpProduct.ProductCode],
    //   PurchaseDate: [this.pumpProduct.PurchaseDate],
    //   SaleDate: [this.pumpProduct.SaleDate],
    //   DateStockMeasuredOn: [this.pumpProduct.DateStockMeasuredOn],
    //   CategoryID: [this.pumpProduct.CategoryID]
    // });
    // let latest_PurchaseDate = this.datepipe.transform(((this.pumpProduct.PurchaseDate == "" || this.pumpProduct.PurchaseDate == null ) ? new Date().toString() : this.pumpProduct.PurchaseDate), 'yyyy-MM-dd');
    // this.inventoryDialogform.get('PurchaseDate').setValue(latest_PurchaseDate);

    // let latest_SaleDate = this.datepipe.transform(((this.pumpProduct.SaleDate == "" || this.pumpProduct.SaleDate == null ) ? new Date().toString() : this.pumpProduct.SaleDate), 'yyyy-MM-dd');
    // this.inventoryDialogform.get('SaleDate').setValue(latest_SaleDate);

    // let latest_DateStockMeasuredOn = this.datepipe.transform(((this.pumpProduct.DateStockMeasuredOn == "" || this.pumpProduct.DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct.DateStockMeasuredOn), 'yyyy-MM-dd');
    // this.inventoryFuelTankDialogform.get('DateStockMeasuredOn').setValue(latest_DateStockMeasuredOn);
    // this.DisableControlsByRole();
  }
  checkFormValidByTanker() {
    if (this.TankerID == 0) {
      this.validationTankerMessage = "Please select Tanker";
      return false;
    }
    else {
      this.validationTankerMessage = "";
    }
  }
  checkFormValid() {
    if (this.TankerID == 0) {
      this.validationTankerMessage = "Please select Tanker";
      return false;
    }
    else if (this.TankerID == 12000 || this.TankerID == 18000) {
      let sumStock: number = 0
      this.pumpTanks.forEach(element => {
        sumStock += element.Stock;
      });
      if (sumStock < this.TankerID) {
        this.validationTankStockMessage = "Please add stock in Tank";
        return false;
      }
      if (sumStock > this.TankerID) {
        this.validationTankStockMessage = "Please remove stock in Tank";
        return false;
      }
    }
    else {
      this.validationTankerMessage = "";
      this.validationTankStockMessage = "";
    }
    // let categoryID = 0;
    // categoryID = this.GetCategoryByProductID(this.inventoryDialogform.controls['ProductID'].value);
    // if (categoryID == 1 || categoryID == 2) {
    //   if (this.inventoryDialogform.controls['Unit'].value == 0) {
    //     this.validationUnitMessage = "Please select Unit";
    //     return false;
    //   }
    //   else{
    //     this.validationUnitMessage = "";
    //   }
    // }
  }
  // getAllProducts() {
  //   this.userService.getAllProductsWithCategory().subscribe(data => {
  //     this.allProduct = data;
  //   });
  // }
  // getAllUnits() {
  //   this.userService.getAllUnits().subscribe(data => {
  //     this.units = data;
  //   });
  // }
  // getAllProducts()
  // {
  //   this.userService.getAllProducts().subscribe(data=>{      
  //     this.allProduct=data;
  //   });
  // }

  createProduct() {
    // this.inventoryDialogform.controls["PurchaseRate"].setValue(Number(this.inventoryDialogform.controls["PurchaseRate"].value));
    // this.inventoryDialogform.controls["SaleRate"].setValue(Number(this.inventoryDialogform.controls["SaleRate"].value));
    
    this.tankWithProduct.pumpProduct = this.pumpProduct;
    this.tankWithProduct.tank = this.pumpTanks;
    this.tankWithProduct.dateOfEntry = this.DateOfEntry;
    this.tankWithProduct.tankerID = this.TankerID; 

    if (this.tankWithProduct.pumpProduct.InitialQuantity == "") {
      this.tankWithProduct.pumpProduct.InitialQuantity = "0";
    }
    if (this.tankWithProduct.pumpProduct.PurchaseRate == "") {
      this.tankWithProduct.pumpProduct.PurchaseRate = "0";
    }
    if (this.tankWithProduct.pumpProduct.SaleRate == "") {
      this.tankWithProduct.pumpProduct.SaleRate = "0";
    }
    if (this.tankWithProduct.pumpProduct.DateStockMeasuredOn == "") {
      this.tankWithProduct.pumpProduct.DateStockMeasuredOn = "0";
    }
    else
    {
      this.tankWithProduct.pumpProduct.DateStockMeasuredOn = this.datepipe.transform(this.tankWithProduct.pumpProduct.DateStockMeasuredOn.toString(), 'yyyy-MM-dd');
    }
    this.petrolPumpService.AddTankAndFuelInventory(this.tankWithProduct, this.pumpCode).subscribe((res: any) => {
      this.toasterService.pop('success', '', 'Stcok has been added.');
      this.dialogRef.close();
      this.router.navigate(['/Inventory', this.pumpProduct.PetrolPumpCode]);
    });
  }

  onChange() {
    let tankerValue = this.TankerID;
    if (tankerValue == 12000) {
      this.IsTankerSelected = true;
      this.IsTwelve = true;
      this.IsEIghteen = false;
    }
    else {
      this.IsTankerSelected = true;
      this.IsTwelve = false;
      this.IsEIghteen = true;
    }
    this.checkFormValidByTanker();
    // let categoryID = 0;
    // let productID =this.inventoryFuelTankDialogform.controls['ProductID'].value;
    // categoryID = this.GetCategoryID();
    // this.DisableControlsByRole(categoryID,productID);
    // this.checkFormValid();
  }

  DisableControlsByRole(categoryID: number, productID: number) {

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

  // GetCategoryID() {
  //   let categoryID = 0;
  //   this.allProduct.forEach(element => {
  //     element.pumpProducts.forEach(element => {
  //       if (element.ID == this.inventoryFuelTankDialogform.controls['ProductID'].value) {
  //         categoryID = element.CategoryID;
  //       }
  //     });
  //   });
  //   return categoryID;
  // }

  // GetCategoryByProductID(productID: number) {
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
