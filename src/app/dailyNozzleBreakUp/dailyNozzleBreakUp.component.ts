
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
import { DatePipe } from '../../../node_modules/@angular/common';
import { PumpProductWithDate } from '../_models/PumpProductWithDate';
import { UserDetail } from '../_models/userDetail';
import { UserInfo } from '../_models/UserInfo';
import { pp_Tank } from '../_models/pp_Tank';
import { pp_Nozzle } from '../_models/pp_Nozzle';
import {NozzleDailyBreakUp} from '../_models/NozzleDailyBreakUp';
import { PaymentType } from '../_models/PaymentType';

@Component({
  selector: 'pump-dailyNozzleBreakUp',
  templateUrl: './dailyNozzleBreakUp.component.html',
  styleUrls: ['./dailyNozzleBreakUp.component.css']
})
export class DailyNozzleBreakUpFormComponent implements OnInit {
  // @Input() pumpProduct: pp_PumpProduct[];
  // @Input() pumpCode: string;
  public pumpProduct: pp_PumpProduct[];
  public pumpTanks: pp_Tank[];
  public nozzleDailyBreakUp: NozzleDailyBreakUp[];
  public pumpNozzles: pp_Nozzle[];
  paymentTypes: PaymentType[];
  public pumpCode: string;
  allProducts: AllProduct[];
  pumpProductWithDate: PumpProductWithDate;
  DateOfEntry: string;
  public userData:UserInfo;
  productDialogform: FormGroup;
  navigationSubscription;
  units: Unit[];
  nozzleID:number;
  constructor(private toasterService: ToasterService, public dialog: MatDialog, private router: Router, private userService: UserService, private _formBuilder: FormBuilder, private petrolPumpService: PetrolPumpService, @Inject(MAT_DIALOG_DATA) public data,
  private dialogRef: MatDialogRef<DailyNozzleBreakUpFormComponent>, public datepipe: DatePipe) {   
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
    this.nozzleDailyBreakUp = this.data.pumpProductNew;
    //this.getAllPaymentType();
    // if (this.pumpCode && this.pumpCode != '') {
    //   //this.getUserInfo();
    //   this.getPumpInfo(this.pumpCode);
    //   this.getUserDate();
    // }
    // this.productDialogform = this._formBuilder.group({
    //   ID: 0,
    //   PetrolPumpCode: '',
    //   ProductName: '',
    //   ProductID: 0,
    //   PurchaseRate: 0,
    //   SaleRate: 0
    // });
    //this.DateOfEntry = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    // if (this.pumpProduct != null && this.pumpProduct != undefined && this.pumpProduct.length) {
    //   //this.pumpProductWithDate.pp_PumpProduct = this.pumpProduct;
    //   let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
    //   this.DateOfEntry = latest_ReadingDate;
    // }

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
  getAllPaymentType() {
    this.userService.getAllPaymentType().subscribe(data => {
      this.paymentTypes = data;
    });
  }
  getPumpInfo(pumpCode) {
    this.petrolPumpService.getPetrolPumpPaymentTypeWithDailyBreakUp(pumpCode).subscribe(res => {
      // this.pumpProduct = res.pp_PumpProduct;
      // this.pumpProduct = this.pumpProduct.filter(c=>c.CategoryID == 1);
      this.nozzleDailyBreakUp = res;
      // this.pumpTanks.forEach(element => {
      //   element.ReadingDate = this.datepipe.transform(((element.ReadingDate == "" || element.ReadingDate == null) ? new Date().toString() : element.ReadingDate), 'yyyy-MM-dd');
      // });
      // let latest_ReadingDate = this.datepipe.transform(((this.pumpProduct[0].DateStockMeasuredOn == "" || this.pumpProduct[0].DateStockMeasuredOn == null) ? new Date().toString() : this.pumpProduct[0].DateStockMeasuredOn), 'yyyy-MM-dd');
      // this.DateOfEntry = latest_ReadingDate;
    });
  }

  editTank(nozzle)
  {
  
  }
  onBlurOpeningReading(tank:pp_Tank)
  {
    tank.OpeningStock = (Number(tank.OpeningReading) + 5).toString();

    //this.tankform.controls["OpeningStock"].setValue(Number(this.tankform.controls["OpeningReading"].value + 5));
  }

  onBlurOpeningStock(tank:pp_Tank)
  {
    
    tank.OpeningReading = (Number(tank.OpeningStock) - 5).toString();
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

  savePumpInfo(pumpProduct: NozzleDailyBreakUp[]) {
    // var daatr = this.productDialogform.value;
    // var date = this.DateOfEntry;
    pumpProduct.forEach(element => {
      element.Amount = Number(element.Amount)
      element.DateEntered = this.datepipe.transform(((element.DateEntered == "" || element.DateEntered == null) ? new Date().toString() : element.DateEntered), 'yyyy-MM-dd');
    });
    this.petrolPumpService.UpdateDailyNozzleReadingBreakUp(pumpProduct).subscribe(res => {
      this.toasterService.pop('success', '', 'Tank Readings updated successfully.');
      this.dialogRef.close();
      this.router.navigate(['/DailyNozzleReading', this.pumpCode]);
    });
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res)=>{
      this.userData=res;
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
