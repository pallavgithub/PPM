
import { Component, OnInit, Input, SimpleChange, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { UserService } from '../_services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { AllProduct } from '../AllProduct';
import { Unit } from '../_models/Unit';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { DatePipe } from '../../../node_modules/@angular/common';
import { PumpProductWithDate } from '../_models/PumpProductWithDate';
import { UserDetail } from '../_models/userDetail';
import { UserInfo } from '../_models/UserInfo';

@Component({
  selector: 'pump-priceAdjustment',
  templateUrl: './priceAdjustment.component.html',
  styleUrls: ['./priceAdjustment.component.css']
})
export class PriceAdjustmentComponent implements OnInit {
  // @Input() pumpProduct: pp_PumpProduct[];
  // @Input() pumpCode: string;
  public pumpProduct: pp_PumpProduct[];
  public pumpCode: string;
  public btnSaveDisabled:boolean = false;
  allProducts: AllProduct[];
  pumpProductWithDate: PumpProductWithDate;
  DateOfEntry: string;
  public userData: UserInfo;
  productDialogform: FormGroup;
  navigationSubscription;
  units: Unit[];
  constructor(private router: Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService, private _formBuilder: FormBuilder, private petrolPumpService: PetrolPumpService, public datepipe: DatePipe, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pumpCode = params['pumpCode'];
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }
  // getProductName(ID) { 
  //   if(ID == 0)
  //   {
  //     this.allProducts = new Array<AllProduct>();
  //   }   
  //   var product = this.allProducts.find(c => c.ID == ID);
  //   return product ? product.Name : '';
  // }

  // getUnitName(ID) {   
  //   if(ID == 0)
  //   {
  //     this.units = new Array<Unit>();
  //   }   
  //   var unitName = this.units.find(c => c.ID == ID);
  //   return unitName ? unitName.Name : '';
  // }


  ngOnInit() {
    if (this.pumpCode && this.pumpCode != '') {
      //this.getUserInfo();
      this.getPumpInfo(this.pumpCode);
      this.getUserDate();
    }
    this.productDialogform = this._formBuilder.group({
      ID: 0,
      PetrolPumpCode: '',
      ProductName: '',
      ProductID: 0,
      PurchaseRate: 0,
      SaleRate: 0
    });
    //this.DateOfEntry = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    if (this.pumpProduct != null && this.pumpProduct != undefined && this.pumpProduct.length) {
      //this.pumpProductWithDate.pp_PumpProduct = this.pumpProduct;
      let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
      this.DateOfEntry = latest_ReadingDate;
    }

    // const controls = this.pumpProduct.map(c => new FormArray(false));
    // controls[0].setValue(true); // Set the first checkbox to true (checked)

    // this.productDialogform2 = this._formBuilder.group({
    //   pumpProduct: new FormArray(controls)
    // });




    // this.productDialogform = this._formBuilder.array({
    //   'productDialogform2' : this.productDialogform2
    // });
    // let employeeFormGroups = this.productDetails.map(pumpProduct => this._formBuilder.group(pumpProduct));
    // let employeeFormArray = this._formBuilder.array(employeeFormGroups);
    // this.productDialogform.setControl('productDetails', employeeFormArray);
    //this.getAllProducts();
    //this.getAllUnits();
  }
  getPumpInfo(pumpCode) {
    let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpDashboardWithDate(pumpCode, date).subscribe(res => {
      this.pumpProduct = res.pp_PumpProduct;
      this.pumpProduct = this.pumpProduct.filter(c => c.CategoryID == 1);
      let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
      this.DateOfEntry = latest_ReadingDate;
      this.pumpProduct.forEach(element => {
        if (element.PurchaseRate == "0") {
          this.btnSaveDisabled = true;
          element.PurchaseRate = "";
        }
        if (element.SaleRate == "0") {
          this.btnSaveDisabled = true;
          element.SaleRate = "";
        }
      });
      debugger;
    });
  }

  // ngOnChanges(changes: SimpleChange) {
  //   // changes['pumpProduct']
  //   this.pumpProduct = changes["pumpProduct"].currentValue;
  //   if(this.pumpProduct != null && this.pumpProduct != undefined && this.pumpProduct.length > 0)
  //   {
  //     this.pumpProduct = this.pumpProduct.filter(c=>c.CategoryID == 1);
  //     let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
  //     this.DateOfEntry = latest_ReadingDate;
  //   }    
  // }

  savePumpInfo(pumpProduct: pp_PumpProduct[]) {
    let flag: number = 0;
    let purchaseprice: string = "";
    let saleprice: string = "";
    pumpProduct.forEach(element => {
      if (element.PurchaseRate.toString().indexOf(".") != -1 && element.PurchaseRate.toString().length > 4) {
        purchaseprice = element.PurchaseRate.toString().substring(0, element.PurchaseRate.toString().indexOf(".") + 3);
      }
      else {
        purchaseprice = element.PurchaseRate.toString();
      }
      if (element.SaleRate.toString().indexOf(".") != -1 && element.SaleRate.toString().length > 4) {
        saleprice = element.SaleRate.toString().substring(0, element.SaleRate.toString().indexOf(".") + 3);
      }
      else {
        saleprice = element.SaleRate.toString();
      }
      if (purchaseprice == "0" || purchaseprice == "0.0" || purchaseprice == "0.00" || purchaseprice == "") {
        flag = 1;
      }
      if (saleprice == "0" || saleprice == "0.0" || saleprice == "0.00" || saleprice == "") {
        flag = 1;
      }
    });
    if (flag == 1) {
      this.toasterService.pop('error', '', 'Please provide details.');
      return false;
    }
    else {
      var daatr = this.productDialogform.value;
      var date = this.DateOfEntry;
      pumpProduct.forEach(element => {
        element.DateStockMeasuredOn = date
      });
      this.petrolPumpService.updatePetrolPumpPriceAdjustmentInfo(pumpProduct).subscribe(res => {
        this.toasterService.pop('success', '', 'Price details updated successfully.');
        this.router.navigate(['/DailyPrice', this.pumpCode]);
      });
    }
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res) => {
      this.userData = res;
    });
  }

  // editProduct(pumpProductNew: pp_PumpProduct) {
  //   pumpProductNew.IsEditModal = true;
  //   const dialogRef = this.dialog.open(ProductDialogFormComponent, {
  //     data: { pumpProductNew }
  //   });
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   this.ngOnInit();
  //   // });
  // }
  // getAllUnits() {
  //   this.userService.getAllUnits().subscribe(data => {
  //     this.units = data;
  //   });
  // }
  // getAllProducts() {
  //   this.userService.getAllProducts().subscribe(data => {
  //     this.allProducts = data;
  //   });
  // }
  // removeUser(i: number) {
  //   //this.pumpUsers.splice(i, 1);
  // }

  // ChangePassword(user: pp_User) {
  //   const dialogRef = this.dialog.open(ChangePasswordComponent, {
  //     data: { user }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }
  // DeleteProduct(product: pp_PumpProduct) {
  //   if (confirm("Do you want to delete this product?")) {
  //     this.userService.deleteProduct(product).subscribe((res: any) => {
  //       this.toasterService.pop('success', '', res.Result.toString());
  //       this.router.navigate(['/pumpDetails',this.pumpCode]);
  //     },
  //       (err) => {

  //       });


  //   }
  // }
}
