
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
import { pp_Tank } from '../_models/pp_Tank';

@Component({
  selector: 'pump-dailyTankReadingDialog',
  templateUrl: './dailyTankReadingDialog.component.html',
  styleUrls: ['./dailyTankReadingDialog.component.css']
})
export class DailyTankReadingDialogComponent implements OnInit {
  // @Input() pumpProduct: pp_PumpProduct[];
  // @Input() pumpCode: string;
  public pumpProduct: pp_PumpProduct[];
  public pumpTanks: pp_Tank[];
  public pumpCode: string;
  allProducts: AllProduct[];
  productDate: Date;
  public btnSaveDisabled: boolean = false;
  public btnSaveDisabledClosing: boolean = false;
  pumpProductWithDate: PumpProductWithDate;
  DateOfEntry: string;
  public userData: UserInfo;
  productDialogform: FormGroup;
  navigationSubscription;
  units: Unit[];
  constructor(private router: Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService, private _formBuilder: FormBuilder, private petrolPumpService: PetrolPumpService, public datepipe: DatePipe, private activatedRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data,private dialogRef: MatDialogRef<DailyTankReadingDialogComponent>) {
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
    this.productDate = this.data.incompleteTanks;
    this.pumpCode = this.data.pumpCode;
    if (this.pumpCode && this.pumpCode != '') {
      //this.getUserInfo();
      this.getPumpInfo(this.pumpCode, this.productDate);
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
  getPumpInfo(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    let flag: boolean = false;
    let closingFlag: boolean = false;
    this.petrolPumpService.getPetrolPumpTankInfoWithDailyEntry(pumpCode, date).subscribe(res => {
      // this.pumpProduct = res.pp_PumpProduct;
      // this.pumpProduct = this.pumpProduct.filter(c=>c.CategoryID == 1);
      this.pumpTanks = res;
      this.pumpTanks.forEach(element => {
        element.ReadingDate = this.datepipe.transform(((element.ReadingDate == "" || element.ReadingDate == null) ? new Date().toString() : element.ReadingDate), 'yyyy-MM-dd');
        if (element.OpeningReading == "0") {
          flag = true;
          // this.btnSaveDisabled = true;
          element.OpeningReading = "";
        }
        if (element.OpeningStock == "0") {
          flag = true;
          // this.btnSaveDisabled = true;       
          element.OpeningStock = "";
        }
        if (element.ClosingReading == "0") {
          closingFlag = true;
          // this.btnSaveDisabled = true;
          element.ClosingReading = "";
        }
        if (element.ClosingStock == "0") {
          closingFlag = true;
          // this.btnSaveDisabled = true;       
          element.ClosingStock = "";
        }
      });
      if (flag == true) {
        this.btnSaveDisabled = true;
      }
      else {
        this.btnSaveDisabled = false;
      }

      if (closingFlag == true) {
        this.btnSaveDisabledClosing = true;
      }
      else {
        this.btnSaveDisabledClosing = false;
      }
      // let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
      // this.DateOfEntry = latest_ReadingDate;
    });
  }

  onBlurOpeningReading(tank: pp_Tank) {
    tank.OpeningStock = (Number(tank.OpeningReading) + 5).toString();

    //this.tankform.controls["OpeningStock"].setValue(Number(this.tankform.controls["OpeningReading"].value + 5));
  }

  onBlurOpeningStock(tank: pp_Tank) {

    tank.OpeningReading = (Number(tank.OpeningStock) - 5).toString();
    //this.tankform.controls["OpeningReading"].setValue(Number(this.tankform.controls["OpeningStock"].value - 5));
  }

  onBlurClosingReading(tank: pp_Tank) {
    tank.ClosingStock = (Number(tank.ClosingReading) + 5).toString();

    //this.tankform.controls["OpeningStock"].setValue(Number(this.tankform.controls["OpeningReading"].value + 5));
  }

  onBlurClosingStock(tank: pp_Tank) {

    tank.ClosingReading = (Number(tank.ClosingStock) - 5).toString();
    //this.tankform.controls["OpeningReading"].setValue(Number(this.tankform.controls["OpeningStock"].value - 5));
  }
  onBlurDate(tank: pp_Tank) {
    this.getPumpInfo(tank.PetrolPumpCode, tank.ReadingDate);
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

  savePumpInfo(pumpProduct: pp_Tank[]) {
    if (confirm("do you confirm, entries you are adding are correct?")) {
      let flag: number = 0;
      let purchaseprice: string = "";
      let saleprice: string = "";

      let purchaseprice2: string = "";
      let saleprice2: string = "";

      pumpProduct.forEach(element => {
        if (element.OpeningReading.toString().indexOf(".") != -1 && element.OpeningReading.toString().length > 4) {
          purchaseprice = element.OpeningReading.toString().substring(0, element.OpeningReading.toString().indexOf(".") + 3);
        }
        else {
          purchaseprice = element.OpeningReading.toString();
        }
        if (element.OpeningStock.toString().indexOf(".") != -1 && element.OpeningStock.toString().length > 4) {
          saleprice = element.OpeningStock.toString().substring(0, element.OpeningStock.toString().indexOf(".") + 3);
        }
        else {
          saleprice = element.OpeningStock.toString();
        }

        if (element.ClosingReading.toString().indexOf(".") != -1 && element.ClosingReading.toString().length > 4) {
          purchaseprice2 = element.ClosingReading.toString().substring(0, element.ClosingReading.toString().indexOf(".") + 3);
        }
        else {
          purchaseprice2 = element.ClosingReading.toString();
        }
        if (element.ClosingStock.toString().indexOf(".") != -1 && element.ClosingStock.toString().length > 4) {
          saleprice2 = element.ClosingStock.toString().substring(0, element.ClosingStock.toString().indexOf(".") + 3);
        }
        else {
          saleprice2 = element.ClosingStock.toString();
        }

        if (purchaseprice == "0" || purchaseprice == "0.0" || purchaseprice == "0.00" || purchaseprice == "") {
          flag = 1;
        }
        if (saleprice == "0" || saleprice == "0.0" || saleprice == "0.00" || saleprice == "") {
          flag = 1;
        }

        if (purchaseprice2 == "0" || purchaseprice2 == "0.0" || purchaseprice2 == "0.00" || purchaseprice2 == "") {
          flag = 1;
        }
        if (saleprice2 == "0" || saleprice2 == "0.0" || saleprice2 == "0.00" || saleprice2 == "") {
          flag = 1;
        }
      });
      if (flag == 1) {
        this.toasterService.pop('error', '', 'Please provide details.');
        return false;
      }
      else {
        // var daatr = this.productDialogform.value;
        // var date = this.DateOfEntry;
        // pumpProduct.forEach(element => {
        //   element.DateStockMeasuredOn = date
        // });    
        this.petrolPumpService.updateDailyTankReading(pumpProduct).subscribe(res => {
          this.toasterService.pop('success', '', 'Tank Readings updated successfully.');
          //this.router.navigate(['/DailyTankReading', this.pumpCode]);
          this.dialogRef.close();
        });
      }
    }
    else {
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
