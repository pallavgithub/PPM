
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
import { NozzleDailyBreakUp } from '../_models/NozzleDailyBreakUp';
import { PaymentType } from '../_models/PaymentType';
import { FuelType } from '../_models/FuelType';
import { CreditorInventory } from '../_models/CreditorInventory';

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
  public nozzleDailyBreakUpGet: NozzleDailyBreakUp[];
  public nozzleDailyBreakUpGetForLubes: NozzleDailyBreakUp[];
  public nozzleDailyBreakUpGetForExpense: NozzleDailyBreakUp[];
  public pumpNozzles: pp_Nozzle[];
  public ApprovedCreditorInventory: CreditorInventory[];
  public totalCreditorSaleToday: number = 0;
  public totalFuelSaleToday: number = 0;
  public totalLubriantSaleToday: number = 0;
  public totalExpenseToday: number = 0;
  public totalBalance: number;
  paymentTypes: PaymentType[] = new Array();
  public pumpCode: string;
  public pumpProductWithLubesPrise: pp_PumpProduct[];
  fuelTypes: FuelType[];
  public btnSaveDisabled: boolean = false;
  public btnSaveDisabledAfterAdd: boolean = false;
  allProducts: AllProduct[];
  pumpProductWithDate: PumpProductWithDate;
  DateOfEntry: string;
  public addPaymentTypeVisible: boolean = false;
  public addLubeSaleVisible: boolean = false;
  public addExpenseSaleVisible: boolean = false;
  public userData: UserInfo;
  productDialogform: FormGroup;
  LubesDialogform: FormGroup;
  ExpensesDialogform: FormGroup;
  navigationSubscription;
  units: Unit[];
  nozzleID: number;
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
    this.SetPaymentType(this.nozzleDailyBreakUp);
    if (this.nozzleDailyBreakUp != null && this.nozzleDailyBreakUp != undefined && this.nozzleDailyBreakUp.length > 0) {
      this.getCreditorInventory(this.nozzleDailyBreakUp[0].PetrolPumpCode, this.nozzleDailyBreakUp[0].NozzleID, this.nozzleDailyBreakUp[0].DateEntered);
    }
    this.getLubesWithLowLimit(this.nozzleDailyBreakUp[0].PetrolPumpCode);

    //this.getAllPaymentType();
    // if (this.pumpCode && this.pumpCode != '') {
    //   //this.getUserInfo();
    //   this.getPumpInfo(this.pumpCode);
    //   this.getUserDate();
    // }
    this.productDialogform = this._formBuilder.group({
      PaymentTypeID: 0,
      Amount: ''
    });
    this.LubesDialogform = this._formBuilder.group({
      FuelTypeID: 0,
      Quantity: ''
    });
    this.ExpensesDialogform = this._formBuilder.group({
      Description: '',
      Amount: ''
    });
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
  getCreditorInventory(pumpCode, nozzleID, dateEntered) {
    let date: Date = new Date();
    this.petrolPumpService.getPetrolPumpTodaySpecificCreditorInventory(pumpCode, nozzleID, dateEntered).subscribe(res => {
      this.totalCreditorSaleToday = res;
    });
  }
  AddIncomeHead() {
    this.addPaymentTypeVisible = true;
  }
  RemoveIncomeHead() {
    this.addPaymentTypeVisible = false;
  }

  addLubeSale() {
    this.addLubeSaleVisible = true;
  }
  RemoveLubeSale() {
    this.addLubeSaleVisible = false;
  }

  addExpenseSale() {
    this.addExpenseSaleVisible = true;
  }
  RemoveExpenseSale() {
    this.addExpenseSaleVisible = false;
  }
  getAllFuelType(PetrolPumpCode: string) {
    this.userService.getAllRegisteredLubes(PetrolPumpCode).subscribe(data => {
      this.fuelTypes = data;
    });
  }
  SetPaymentType(nozzleDailyBreakUp: NozzleDailyBreakUp[]) {
    let paymentTypeItem: PaymentType = new PaymentType();
    nozzleDailyBreakUp.forEach(element => {
      paymentTypeItem = new PaymentType();
      paymentTypeItem.ID = element.PaymentTypeID;
      paymentTypeItem.Name = element.PaymentTypeName;
      this.paymentTypes.push(paymentTypeItem);
    });
    this.getAllFuelType(nozzleDailyBreakUp[0].PetrolPumpCode);
    this.getNozzleBreakUp(nozzleDailyBreakUp[0].PetrolPumpCode, nozzleDailyBreakUp[0].NozzleID, nozzleDailyBreakUp[0].DateEntered);
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

  editTank(nozzle) {

  }
  onBlurOpeningReading(tank: pp_Tank) {
    tank.OpeningStock = (Number(tank.OpeningReading) + 5).toString();

    //this.tankform.controls["OpeningStock"].setValue(Number(this.tankform.controls["OpeningReading"].value + 5));
  }

  onBlurOpeningStock(tank: pp_Tank) {

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

  savePumpInfo() {
    var daatr = this.productDialogform.value;
    // var date = this.DateOfEntry;
    // pumpProduct.forEach(element => {
    //   element.Amount = Number(element.Amount)
    //   element.DateEntered = this.datepipe.transform(((element.DateEntered == "" || element.DateEntered == null) ? new Date().toString() : element.DateEntered), 'yyyy-MM-dd');
    // });
    let paymentTypeID = this.productDialogform.controls["PaymentTypeID"].value;
    let amount = this.productDialogform.controls["Amount"].value;
    if (paymentTypeID == 0 || amount == 0 || amount == '') {
      this.toasterService.pop('error', '', 'Please add fuel sales');
    }
    else {
      if (this.nozzleDailyBreakUpGet.filter(p => p.PaymentTypeID == paymentTypeID).length > 0) {
        this.toasterService.pop('error', '', 'This is already added');
      }
      else {
        let nozzleDailyBreakUpItem: NozzleDailyBreakUp[] = new Array();
        nozzleDailyBreakUpItem = this.nozzleDailyBreakUp.filter(p => p.PaymentTypeID == paymentTypeID);
        nozzleDailyBreakUpItem.forEach(element => {
          element.Amount = amount,
            element.BreakUpTypeID = 1 // 1 for payment type
        });
        this.petrolPumpService.UpdateDailyNozzleReadingBreakUp(nozzleDailyBreakUpItem).subscribe(res => {
          this.toasterService.pop('success', '', 'Fuel sale added successfully.');
          this.addPaymentTypeVisible = false;
          this.getNozzleBreakUp(nozzleDailyBreakUpItem[0].PetrolPumpCode, nozzleDailyBreakUpItem[0].NozzleID, nozzleDailyBreakUpItem[0].DateEntered);
          this.btnSaveDisabledAfterAdd = true;
          //this.dialogRef.close();
          //this.router.navigate(['/DailyNozzleReading', this.pumpCode]);
        });
      }
    }    
  }

  savePumpInfoForLubes() {
    var daatr = this.LubesDialogform.value;
    // var date = this.DateOfEntry;
    // pumpProduct.forEach(element => {
    //   element.Amount = Number(element.Amount)
    //   element.DateEntered = this.datepipe.transform(((element.DateEntered == "" || element.DateEntered == null) ? new Date().toString() : element.DateEntered), 'yyyy-MM-dd');
    // });
    let paymentTypeID = this.LubesDialogform.controls["FuelTypeID"].value;
    let amount = this.LubesDialogform.controls["Quantity"].value;
    let pumpProductWithLubesPriseTemp: pp_PumpProduct[];
    let totalCapacity:number = 0;
    pumpProductWithLubesPriseTemp = this.pumpProductWithLubesPrise.filter(p=>p.ProductID == paymentTypeID);
    if(pumpProductWithLubesPriseTemp != null && pumpProductWithLubesPriseTemp.length > 0)
    {
      totalCapacity = Number(pumpProductWithLubesPriseTemp[0].InitialQuantity);
      if(totalCapacity < amount)
      {
        this.toasterService.pop('error', '', 'You do not have this capacity');
      }
      else
      {
        if (paymentTypeID == 0 || amount == 0 || amount == '') {
          this.toasterService.pop('error', '', 'Please add lubricant sales');
        }
        else {
          if (this.nozzleDailyBreakUpGetForLubes.filter(p => p.PaymentTypeID == paymentTypeID).length > 0) {
            this.toasterService.pop('error', '', 'This is already added');
          }
          else {
            let nozzleDailyBreakUpItemArray: NozzleDailyBreakUp[] = new Array();
            let nozzleDailyBreakUpItem: NozzleDailyBreakUp = new NozzleDailyBreakUp();
            //nozzleDailyBreakUpItem = this.nozzleDailyBreakUp.filter(p=>p.PaymentTypeID == paymentTypeID);
            nozzleDailyBreakUpItem.Amount = amount,
              nozzleDailyBreakUpItem.BreakUpTypeID = 2, // 1 for payment type
              nozzleDailyBreakUpItem.PetrolPumpCode = this.nozzleDailyBreakUp[0].PetrolPumpCode,
              nozzleDailyBreakUpItem.NozzleID = this.nozzleDailyBreakUp[0].NozzleID,
              nozzleDailyBreakUpItem.DateEntered = this.nozzleDailyBreakUp[0].DateEntered,
              nozzleDailyBreakUpItem.Description = this.nozzleDailyBreakUp[0].Description,
              nozzleDailyBreakUpItem.DailyNozzleReadingID = this.nozzleDailyBreakUp[0].DailyNozzleReadingID
            nozzleDailyBreakUpItem.PaymentTypeID = paymentTypeID;
            nozzleDailyBreakUpItem.PaymentTypeName = this.getFuelTypeName(paymentTypeID);
            nozzleDailyBreakUpItemArray.push(nozzleDailyBreakUpItem);
            this.petrolPumpService.UpdateDailyNozzleReadingBreakUp(nozzleDailyBreakUpItemArray).subscribe(res => {
              this.toasterService.pop('success', '', 'Break up has been added.');
              this.addLubeSaleVisible = false;
              this.getNozzleBreakUp(nozzleDailyBreakUpItem.PetrolPumpCode, nozzleDailyBreakUpItem.NozzleID, nozzleDailyBreakUpItem.DateEntered);
              this.btnSaveDisabledAfterAdd = true;
              //this.dialogRef.close();
              //this.router.navigate(['/DailyNozzleReading', this.pumpCode]);
            });
          }
        }
      }
    }        
  }

  savePumpInfoForExpense() {
    var daatr = this.ExpensesDialogform.value;
    // var date = this.DateOfEntry;
    // pumpProduct.forEach(element => {
    //   element.Amount = Number(element.Amount)
    //   element.DateEntered = this.datepipe.transform(((element.DateEntered == "" || element.DateEntered == null) ? new Date().toString() : element.DateEntered), 'yyyy-MM-dd');
    // });
    let description = this.ExpensesDialogform.controls["Description"].value;
    let amount = this.ExpensesDialogform.controls["Amount"].value;
    if (description == '' || amount == 0 || amount == '') {
      this.toasterService.pop('error', '', 'Please add expenses');
    }
    else {
      let nozzleDailyBreakUpItemArray: NozzleDailyBreakUp[] = new Array();
      let nozzleDailyBreakUpItem: NozzleDailyBreakUp = new NozzleDailyBreakUp();
      //nozzleDailyBreakUpItem = this.nozzleDailyBreakUp.filter(p=>p.PaymentTypeID == paymentTypeID);
      nozzleDailyBreakUpItem.Amount = amount,
        nozzleDailyBreakUpItem.BreakUpTypeID = 3, // 1 for payment type
        nozzleDailyBreakUpItem.PetrolPumpCode = this.nozzleDailyBreakUp[0].PetrolPumpCode,
        nozzleDailyBreakUpItem.NozzleID = this.nozzleDailyBreakUp[0].NozzleID,
        nozzleDailyBreakUpItem.DateEntered = this.nozzleDailyBreakUp[0].DateEntered,
        nozzleDailyBreakUpItem.Description = description,
        nozzleDailyBreakUpItem.DailyNozzleReadingID = this.nozzleDailyBreakUp[0].DailyNozzleReadingID
      nozzleDailyBreakUpItem.PaymentTypeID = 0;
      nozzleDailyBreakUpItem.PaymentTypeName = null;
      nozzleDailyBreakUpItemArray.push(nozzleDailyBreakUpItem);
      this.petrolPumpService.UpdateDailyNozzleReadingBreakUp(nozzleDailyBreakUpItemArray).subscribe(res => {
        this.toasterService.pop('success', '', 'Expenses added successfully.');
        this.addExpenseSaleVisible = false;
        this.getNozzleBreakUp(nozzleDailyBreakUpItem.PetrolPumpCode, nozzleDailyBreakUpItem.NozzleID, nozzleDailyBreakUpItem.DateEntered);
        this.btnSaveDisabledAfterAdd = true;
        //this.dialogRef.close();
        //this.router.navigate(['/DailyNozzleReading', this.pumpCode]);
      });
    }
  }

  getLubesWithLowLimit(pumpCode) {
    let currentDate:Date = new Date();
    //currentDate.setDate(currentDate.getDate() - 1);
    let date:string = this.datepipe.transform(currentDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpLubesInfoOfLowLimit(pumpCode,date).subscribe(res => {      
      this.pumpProductWithLubesPrise = res; 
      this.pumpProductWithLubesPrise = this.pumpProductWithLubesPrise.filter(c => Number(c.InitialQuantity) < 1000)     
    });
  }

  getFuelTypeName(paymentTypeID: number) {
    let res = this.fuelTypes.filter(p => p.ID == paymentTypeID);
    return res[0].Name;
  }
  getNozzleBreakUp(pumpCode, nozzleID, date) {
    this.totalFuelSaleToday = 0;
    this.totalLubriantSaleToday = 0;
    this.totalExpenseToday = 0;
    this.petrolPumpService.GetNozzleBreakUp(pumpCode, nozzleID, date).subscribe(res => {
      this.nozzleDailyBreakUpGet = res.filter(p => p.BreakUpTypeID == 1);
      this.nozzleDailyBreakUpGet.forEach(element => {
        this.totalFuelSaleToday = this.totalFuelSaleToday + element.Amount;
      });
      this.nozzleDailyBreakUpGetForLubes = res.filter(p => p.BreakUpTypeID == 2);
      this.nozzleDailyBreakUpGetForLubes.forEach(element => {
        this.totalLubriantSaleToday = this.totalLubriantSaleToday + element.Amount;
        element.Amount = Number(element.Description);
        //element.Description = Number((element.Amount / Number(element.Description))).toString() + " price";
      });
      this.nozzleDailyBreakUpGetForExpense = res.filter(p => p.BreakUpTypeID == 3);
      this.nozzleDailyBreakUpGetForExpense.forEach(element => {
        this.totalExpenseToday = this.totalExpenseToday + element.Amount;
      });
      this.totalBalance = this.totalFuelSaleToday + this.totalLubriantSaleToday - this.totalExpenseToday;
      if (this.totalBalance == 0) {
        this.btnSaveDisabled = false;
      }
      else if (this.totalBalance != 0 && this.btnSaveDisabledAfterAdd == true) {
        this.btnSaveDisabled = false;
      }
      else {
        this.btnSaveDisabled = true;
      }
    });
  }

  // savePumpInfo(pumpProduct: NozzleDailyBreakUp[]) {
  //   // var daatr = this.productDialogform.value;
  //   // var date = this.DateOfEntry;
  //   pumpProduct.forEach(element => {
  //     element.Amount = Number(element.Amount)
  //     element.DateEntered = this.datepipe.transform(((element.DateEntered == "" || element.DateEntered == null) ? new Date().toString() : element.DateEntered), 'yyyy-MM-dd');
  //   });
  //   this.petrolPumpService.UpdateDailyNozzleReadingBreakUp(pumpProduct).subscribe(res => {
  //     this.toasterService.pop('success', '', 'Tank Readings updated successfully.');
  //     this.dialogRef.close();
  //     this.router.navigate(['/DailyNozzleReading', this.pumpCode]);
  //   });
  // }
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
