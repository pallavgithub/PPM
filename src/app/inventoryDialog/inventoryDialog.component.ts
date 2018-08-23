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
import { pp_Inventory } from '../_models/pp_Inventory';

@Component({
  selector: 'inventoryDialogform',
  templateUrl: './inventoryDialog.component.html',
  styleUrls: ['./inventoryDialog.component.css']
})
export class InventoryDialogFormComponent implements OnInit {
  pumpInventory: pp_Inventory;
  allProduct: ProductWithCategory[];
  units: Unit[]
  divCategory : number;
  //allProduct:AllProduct[];
  IsEditDialog: boolean;
  btnDisabled: boolean = false;
  inventoryDialogform: FormGroup;
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
    private dialogRef: MatDialogRef<InventoryDialogFormComponent>) {

  }

  ngOnInit() {
    this.pumpInventory = this.data.pumpInventoryNew;
    this.divCategory = 0;
    if (this.pumpInventory.IsEditModal == true) {
      this.IsEditDialog = true;
    }
    else {
      this.IsEditDialog = false;
    }
    this.getAllProducts();
    //this.getAllUnits();
    //this.DisableControlsByRole(this.pumpInventory.CategoryID);

    this.inventoryDialogform = this._formBuilder.group({
      ID: [this.pumpInventory.ID],
      PetrolPumpCode: [this.pumpInventory.PetrolPumpCode],
      ProductCategoryID: [this.pumpInventory.ProductCategoryID],
      ProductID: [this.pumpInventory.ProductID],
      LubricantIntialStockQuantity: [this.pumpInventory.LubricantIntialStockQuantity],
      LubricantIntialStockDate: [this.pumpInventory.LubricantIntialStockDate],
      LubricantStockQuantity: [this.pumpInventory.LubricantStockQuantity],
      LubricantStockDate: [this.pumpInventory.LubricantStockDate],
      FuelIntialReadingQuantity: [this.pumpInventory.FuelIntialReadingQuantity],
      FuelIntialReadingDate: [this.pumpInventory.FuelIntialReadingDate],
      FuelReadingQuantity: [this.pumpInventory.FuelReadingQuantity],
      FuelReadingDate: [this.pumpInventory.FuelReadingDate],
      FuelTankID: [this.pumpInventory.FuelTankID],
      FuelReadingTypeID: [this.pumpInventory.FuelReadingTypeID],
      FuelTankerTypeID: [this.pumpInventory.FuelTankerTypeID],
      Description: [this.pumpInventory.Description],
      CreatedBy: [this.pumpInventory.CreatedBy],
      CreatedOn: [this.pumpInventory.CreatedOn],
      ModifiedBy: [this.pumpInventory.ModifiedBy],
      ModifiedOn: [this.pumpInventory.ModifiedOn],
      IsEditModal: [this.pumpInventory.IsEditModal],
    });
    // this.DisableControlsByRole();
  }

  getAllProducts() {
    this.userService.getAllProductsWithCategory().subscribe(data => {
      this.allProduct = data;
    });
  }
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
    this.petrolPumpService.addUpdatePumpProduct(this.inventoryDialogform.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/dashboard', this.pumpInventory.PetrolPumpCode]);
    });
  }

  // onChange() {
  //   let categoryID = 0;
  //   categoryID = this.GetCategoryID();
  //   this.DisableControlsByRole(categoryID);
  // }

  // DisableControlsByRole(categoryID:number) {   
    
  //   if (categoryID == 1) { // Lubricants
  //     // this.productDialogform.controls['Quantity'].enable();
  //     this.divCategory = 1;
  //   }
  //   else if (categoryID == 2) {
  //     // this.productDialogform.controls['Quantity'].disable();
  //     this.divCategory = 2;
  //   }
  //   else {
  //     // this.productDialogform.controls['Quantity'].disable();
  //     this.divCategory = 3;
  //   }
  // }

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
