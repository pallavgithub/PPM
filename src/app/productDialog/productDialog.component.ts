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

@Component({
  selector: 'productDialogform',
  templateUrl: './productDialog.component.html',
  styleUrls: ['./productDialog.component.css']
})
export class ProductDialogFormComponent implements OnInit {
  pumpProduct: pp_PumpProduct;
  allProduct: ProductWithCategory[];
  units: Unit[]
  divCategory : number;
  //allProduct:AllProduct[];
  IsEditDialog: boolean;
  btnDisabled: boolean = false;
  productDialogform: FormGroup;
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
    private dialogRef: MatDialogRef<ProductDialogFormComponent>) {

  }

  ngOnInit() {
    this.pumpProduct = this.data.pumpProductNew;
    this.divCategory = 0;
    if (this.pumpProduct.IsEditModal == true) {
      this.IsEditDialog = true;
    }
    else {
      this.IsEditDialog = false;
    }
    this.getAllProducts();
    this.getAllUnits();
    this.DisableControlsByRole(this.pumpProduct.CategoryID);

    this.productDialogform = this._formBuilder.group({
      ID: [this.pumpProduct.ID],
      PetrolPumpCode: [this.pumpProduct.PetrolPumpCode],
      ProductID: [this.pumpProduct.ProductID],
      Quantity: [this.pumpProduct.Quantity],
      Unit: [this.pumpProduct.Unit],
      PurchaseRate: [this.pumpProduct.PurchaseRate],
      SaleRate: [this.pumpProduct.SaleRate],
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
      CategoryID:[this.pumpProduct.CategoryID]
    });
    // this.DisableControlsByRole();
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
    this.petrolPumpService.addUpdatePumpProduct(this.productDialogform.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/pumpDetails', this.pumpProduct.PetrolPumpCode]);
    });
  }

  onChange() {
    let categoryID = 0;
    categoryID = this.GetCategoryID();
    this.DisableControlsByRole(categoryID);
  }

  DisableControlsByRole(categoryID:number) {   
    
    if (categoryID == 1) { // Lubricants
      // this.productDialogform.controls['Quantity'].enable();
      this.divCategory = 1;
    }
    else if (categoryID == 2) {
      // this.productDialogform.controls['Quantity'].disable();
      this.divCategory = 2;
    }
    else {
      // this.productDialogform.controls['Quantity'].disable();
      this.divCategory = 3;
    }
  }

  GetCategoryID()
  {
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

  GetCategoryByProductID(productID:number)
  {
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
