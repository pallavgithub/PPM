
import { Component, OnInit, Input, SimpleChange, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { UserService } from '../_services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { AllProduct } from '../AllProduct';
import { Unit } from '../_models/Unit';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { DatePipe } from '@angular/common';
import { PumpProductWithDate } from '../_models/PumpProductWithDate';
import { UserDetail } from '../_models/userDetail';
import { UserInfo } from '../_models/UserInfo';
import { pp_Tank } from '../_models/pp_Tank';
import { pp_Nozzle } from '../_models/pp_Nozzle';
import { DailyNozzleBreakUpFormComponent } from '../dailyNozzleBreakUp/dailyNozzleBreakUp.component';
import { NozzleDailyBreakUp } from '../_models/NozzleDailyBreakUp';
import { DailyTankReadingDialogComponent } from '../dailyTankReadingDialog/dailyTankReadingDialog.component';

@Component({
  selector: 'pump-dailyNozzleReadingDialog',
  templateUrl: './dailyNozzleReadingDialog.component.html',
  styleUrls: ['./dailyNozzleReadingDialog.component.css']
})
export class DailyNozzleReadingDialogComponent implements OnInit {
  // @Input() pumpProduct: pp_PumpProduct[];
  // @Input() pumpCode: string;
  public pumpProduct: pp_PumpProduct[];
  public pumpTanks: pp_Tank[];
  public pumpNozzles: pp_Nozzle[];
  public btnSaveDisabled: boolean = false;
  public btnSaveDisabledClosing: boolean = false;
  public nozzleDailyBreakUp: NozzleDailyBreakUp[];
  public pumpCode: string;
  productDate: Date;
  allProducts: AllProduct[];
  pumpProductWithDate: PumpProductWithDate;
  DateOfEntry: string;
  public userData: UserInfo;
  productDialogform: FormGroup;
  navigationSubscription;
  units: Unit[];
  constructor(private router: Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService, private _formBuilder: FormBuilder, private petrolPumpService: PetrolPumpService, public datepipe: DatePipe, private activatedRoute: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data,private dialogRef: MatDialogRef<DailyTankReadingDialogComponent>) {
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
    this.productDate = this.data.incompleteNozzles;
    this.pumpCode = this.data.pumpCode;
    if (this.pumpCode && this.pumpCode != '') {
      //this.getUserInfo();
      this.getPumpInfo(this.pumpCode,this.productDate);
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
  getPumpInfo(pumpCode,readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    let flag: boolean = false;
    let flagClosing: boolean = false;
    this.petrolPumpService.getPetrolPumpNozzleInfoWithDailyEntry(pumpCode, date).subscribe(res => {
      // this.pumpProduct = res.pp_PumpProduct;
      // this.pumpProduct = this.pumpProduct.filter(c=>c.CategoryID == 1);
      this.pumpNozzles = res;
      this.pumpNozzles.forEach(element => {
        element.ReadingDate = this.datepipe.transform(((element.ReadingDate == "" || element.ReadingDate == null) ? new Date().toString() : element.ReadingDate), 'yyyy-MM-dd');
        if (element.OpeningReading == "0") {
          flag = true;
          //this.btnSaveDisabled = true;
          element.OpeningReading = "";
        }
        if (element.ClosingReading == "0") {
          flagClosing = true;
          //this.btnSaveDisabled = true;
          element.ClosingReading = "";
        }
      });
      if (flag == true) {
        this.btnSaveDisabled = true;
      }
      else {
        this.btnSaveDisabled = false;
      }
      if (flagClosing == true) {
        this.btnSaveDisabledClosing = true;
      }
      else {
        this.btnSaveDisabledClosing = false;
      }
      // let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
      // this.DateOfEntry = latest_ReadingDate;
    });

    //this.petrolPumpService.getPetrolPumpPaymentTypeWithDailyBreakUp(pumpCode).subscribe(res => {
    // this.pumpProduct = res.pp_PumpProduct;
    // this.pumpProduct = this.pumpProduct.filter(c=>c.CategoryID == 1);
    //this.nozzleDailyBreakUp = res;
    // let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
    // this.DateOfEntry = latest_ReadingDate;
    //});
  }

  editTank(nozzle) {

  }
  onBlurOpeningReading(tank: pp_Tank) {
    tank.OpeningStock = (Number(tank.OpeningReading) + 5).toString();

    //this.tankform.controls["OpeningStock"].setValue(Number(this.tankform.controls["OpeningReading"].value + 5));
  }
  onBlurClosingReading(tank: pp_Tank) {
    
    if(tank.ClosingReading < tank.OpeningReading )
    {
      this.toasterService.pop('error', '', 'Nozzle closing reading should be greater than opening reading.');
    }
    else{
      tank.ClosingStock = (Number(tank.ClosingReading) + 5).toString();
    }
    

    //this.tankform.controls["OpeningStock"].setValue(Number(this.tankform.controls["OpeningReading"].value + 5));
  }
  onBlurDate(tank: pp_Tank) {
    this.getPumpInfo(tank.PetrolPumpCode,tank.ReadingDate);
  }

  onBlurOpeningStock(tank: pp_Tank) {

    tank.OpeningReading = (Number(tank.OpeningStock) - 5).toString();
    //this.tankform.controls["OpeningReading"].setValue(Number(this.tankform.controls["OpeningStock"].value - 5));
  }
  onBlurClosingStock(tank: pp_Tank) {

    tank.ClosingReading = (Number(tank.ClosingStock) - 5).toString();
    //this.tankform.controls["OpeningReading"].setValue(Number(this.tankform.controls["OpeningStock"].value - 5));
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

  savePumpInfo(pumpProduct: pp_Nozzle[]) {
    if (confirm("do you confirm, entries you are adding are correct?")) {
      let flag: number = 0;
      let flagCompare: number = 0;
      let flagClosing: number = 0;
    let purchaseprice: string = "";
    let purchaseprice2: string = "";
    pumpProduct.forEach(element => {
      
      if(element.ClosingReading < element.OpeningReading)
      {        
        flagCompare = 1;
      }
      if (element.OpeningReading.toString().indexOf(".") != -1 && element.OpeningReading.toString().length > 4) {
        purchaseprice = element.OpeningReading.toString().substring(0, element.OpeningReading.toString().indexOf(".") + 3);
      }
      else {
        purchaseprice = element.OpeningReading.toString();
      }

      if (element.ClosingReading.toString().indexOf(".") != -1 && element.ClosingReading.toString().length > 4) {
        purchaseprice2 = element.ClosingReading.toString().substring(0, element.ClosingReading.toString().indexOf(".") + 3);
      }
      else {
        purchaseprice2 = element.ClosingReading.toString();
      }

      if (purchaseprice == "0" || purchaseprice == "0.0" || purchaseprice == "0.00" || purchaseprice == "") {
        flag = 1;
      }
      if (purchaseprice2 == "0" || purchaseprice2 == "0.0" || purchaseprice2 == "0.00" || purchaseprice2== "") {
        flagClosing = 1;
      }
     
    });
    if(flagCompare == 1)
    {
      this.toasterService.pop('error', '', 'Nozzle closing reading should be greater than opening reading.');
    }
    else
    {
      if (flag == 1 || flagClosing == 1) {
        this.toasterService.pop('error', '', 'Please provide details.');
        return false;
      }
      else {
        // var daatr = this.productDialogform.value;
        // var date = this.DateOfEntry;
        // pumpProduct.forEach(element => {
        //   element.DateStockMeasuredOn = date
        // });
        this.petrolPumpService.UpdateDailyNozzleReading(pumpProduct).subscribe(res => {
          this.toasterService.pop('success', '', 'Nozzle Readings updated successfully.');
          // this.router.navigate(['/DailyNozzleReading', this.pumpCode]);
          this.getPumpInfo(pumpProduct[0].PetrolPumpCode,pumpProduct[0].ReadingDate);
          this.dialogRef.close();
        });
      }
    }    
    }
    else
    {

    }
    
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res) => {
      this.userData = res;
    });
  }

  editProduct(pumpProductNew: pp_Nozzle, nozzleID: number) {
    pumpProductNew.IsEditModal = true;
    this.petrolPumpService.getPetrolPumpPaymentTypeWithBreakUp(pumpProductNew.PetrolPumpCode, pumpProductNew.ReadingDate, pumpProductNew.ID).subscribe(res => {
      this.nozzleDailyBreakUp = res;
      const dialogRef = this.dialog.open(DailyNozzleBreakUpFormComponent, {
        data: { pumpProductNew: this.nozzleDailyBreakUp }
      });
    });

    // this.nozzleDailyBreakUp.forEach(element => {
    //   element.Amount = 0,
    //   element.DateEntered = new Date().toString();
    //   element.NozzleID = pumpProductNew.ID,
    //   element.PetrolPumpCode = pumpProductNew.PetrolPumpCode,
    //   element.Description = ""
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });
  }
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
