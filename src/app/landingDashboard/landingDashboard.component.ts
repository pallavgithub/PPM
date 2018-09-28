import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { pp_PetrolPump } from '../_models/pp_PetrolPump';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { UserService } from '../_services/user.service';
import { ToasterService } from 'angular2-toaster';
import { UserDetail } from '../_models/userDetail';
import { PumpStatus } from '../_models/PumpStatus';
import { UserInfo } from '../_models/UserInfo';
import { IncompleteDailyData } from '../_models/IncompleteDailyData';
import { IncompleteProducts } from '../_models/IncompleteProducts';
import { IncompleteTanks } from '../_models/IncompleteTanks';
import { IncompleteNozzles } from '../_models/IncompleteNozzles';
import { MatDialog } from '@angular/material';
import { PriceAdjustmentFormComponent } from '../priceAdjustmentForm/priceAdjustmentForm.component';
import { BasicInfo } from '../_models/BasicInfo';
import { DatePipe } from '@angular/common';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { CreditorInventory } from '../_models/CreditorInventory';
import { pp_Tank } from '../_models/pp_Tank';
import { pp_User } from '../_models/pp_User';
import { Tank } from '../_models/Tank';
import { TankLedgerformComponent } from '../tankLedger/tankLedger.component';


@Component({
  selector: 'pump-landingDashboard',
  templateUrl: './landingDashboard.component.html',
  styleUrls: ['./landingDashboard.component.css']
})
export class LandingDashboardComponent implements OnInit {
  // @Input() pumpStatus: PumpStatus[];
  // @Input() pumpCode: string;
  public pumpStatus: PumpStatus;
  public pumpCode: string;
  public incompleteDailyData: IncompleteDailyData;
  public incompleteProducts: IncompleteProducts[];
  public incompleteTanks: IncompleteTanks[];
  public incompleteNozzles: IncompleteNozzles[];
  public pumpProduct: pp_PumpProduct[];
  public msgProduct: string;
  public ApprovedCreditorInventory: CreditorInventory[];
  public PendingCreditorInventory: CreditorInventory[];
  public msgTank: string;
  public creditLimit: string;
  public msgNozzle: string;
  public isPermit: boolean;
  public pumpTanks: pp_Tank[];
  tank: Tank[];
  public pumpTanksLedger: pp_Tank[];
  public pumpUsers: pp_User[];
  public pumpProductWithLubesPrise: pp_PumpProduct[];

  public UserId: string = null;
  public RoleID: number = 0;
  public FullName: string = null;
  public PetrolPumpName: string = null;
  public Address: string = null;
  public Address2: string = null;
  public City: string = null;
  public State: string = null;
  public PetrolPumpPincode: string = null;
  public PetrolPumpCode: string = null;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
  ];

  public lineChartData: Array<any> = [
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: false
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  // comment
  public lineChartDataForFuelDailyPrice: Array<any> = [
  ];
  public lineChartLabelsForFuelDailyPrice: Array<any> = [];
  public lineChartOptionsForFuelDailyPrice: any = {
    responsive: false
  };
  public lineChartColorsForFuelDailyPrice: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendForFuelDailyPrice: boolean = true;
  public lineChartTypeForFuelDailyPrice: string = 'line';

  // for creditor

  public lineChartDataForCreditor: Array<any> = [
  ];
  public lineChartLabelsForCreditor: Array<any> = [];
  public lineChartOptionsForCreditor: any = {
    responsive: false
  };
  public lineChartColorsForCreditor: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendForCreditor: boolean = true;
  public lineChartTypeForCreditor: string = 'line';

  // for Nozzle Sale

  public lineChartDataForNozzleSale: Array<any> = [
  ];
  public lineChartLabelsForNozzleSale: Array<any> = [];
  public lineChartOptionsForNozzleSale: any = {
    responsive: false
  };
  public lineChartColorsForNozzleSale: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendForNozzleSale: boolean = true;
  public lineChartTypeForNozzleSale: string = 'line';

  // for Nozzle Fuel Sale

  public lineChartDataForNozzleFuelSale: Array<any> = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];
  public lineChartLabelsForNozzleFuelSale: Array<any> = [];
  public lineChartOptionsForNozzleFuelSale: any = {
    responsive: false
  };
  public lineChartColorsForNozzleFuelSale: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendForNozzleFuelSale: boolean = true;
  public lineChartTypeForNozzleFuelSale: string = 'line';

  // for Nozzle Sale

  public lineChartDataForNozzleForCreditorSale: Array<any> = [
  ];
  public lineChartLabelsForNozzleForCreditorSale: Array<any> = [];
  public lineChartOptionsForNozzleForCreditorSale: any = {
    responsive: false
  };
  public lineChartColorsForNozzleForCreditorSale: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendForNozzleForCreditorSale: boolean = true;
  public lineChartTypeForNozzleForCreditorSale: string = 'line';

  navigationSubscription;

  status: string;
  public userData: UserInfo;
  public basicInfo: BasicInfo;
  countStatus: number;
  //public userData: UserDetail;
  //pumpLandingForm: FormGroup;
  //RoleID:number;
  // validation_messages = {
  //   'Email': [
  //     { type: 'required', message: 'Email is required' },
  //     { type: 'email', message: 'Enter a valid email' }
  //   ],
  //   'Password': [
  //     { type: 'required', message: 'Password is required' },
  //     { type: 'minlength', message: 'Password must be at least 8 characters long' },
  //     { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
  //   ],
  //   'PetrolPumpName': [
  //     { type: 'required', message: 'Petrol Pump Name is required' },
  //     { type: 'minlength', message: 'Petrol Pump Name must be at least 3 characters long' },
  //     { type: 'pattern', message: 'Only Alphabets, Numbers, @ and & are allowed.' }
  //   ],
  //   'OwnerName': [
  //     { type: 'required', message: 'Owner Name is required' },
  //     { type: 'minlength', message: 'Owner Name must be at least 3 characters long' },
  //     { type: 'pattern', message: 'Only Alphabets, Numbers and spaces are allowed.' }
  //   ],
  //   'Mobile': [
  //     { type: 'required', message: 'Mobile is required' },
  //     { type: 'minlength', message: 'Mobile must be at least 10 characters long' },
  //     { type: 'maxlength', message: 'Mobile can be 12 characters long' },
  //     { type: 'pattern', message: 'Only Numbers are allowed.' }
  //   ]
  // }
  constructor(private toasterService: ToasterService, private _formBuilder: FormBuilder, private router: Router, private petrolPumpService: PetrolPumpService, private activatedRoute: ActivatedRoute, private userService: UserService, public dialog: MatDialog, public datepipe: DatePipe) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pumpCode = params['pumpCode'];
    });
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   if (e instanceof NavigationEnd) {
    //     this.ngOnInit();
    //   }
    // });
  }

  ngOnInit() {
    if (this.pumpCode && this.pumpCode != '') {
      this.getPumpStatus(this.pumpCode);
      this.getUserDate();
      this.getBasicInfo(this.pumpCode);
      this.getCreditLimit(this.pumpCode);
      this.getPumpIncompleteDailyData(this.pumpCode);
      this.getPumpInfo(this.pumpCode);
      this.getCreditorInventory(this.pumpCode);
      this.getTankInfoWithLowLimit(this.pumpCode, new Date().toString());
      this.getLubesWithLowLimit(this.pumpCode);
      this.getPetrolPumpDailyFuelPriceChart(this.pumpCode, new Date().toString());
      this.getPetrolPumpCreditorLedgerChart(this.pumpCode, new Date().toString());
      this.getPetrolPumpNozzleSaleChart(this.pumpCode, new Date().toString());
      this.getPetrolPumpNozzleFuelSaleChart(this.pumpCode, new Date().toString());
      this.getPetrolPumpNozzleSaleForStaffChart(this.pumpCode, new Date().toString());
      this.getTanksByID(this.pumpCode);


      //this.SetFuelPrice();
    }

    // this.pumpLandingForm = this._formBuilder.group({
    //   PetrolPumpCode: [this.pumpStatus.PetrolPumpCode]      
    // });
    //this.getUserInfo();
  }
  OpenTankLedgerDialog(tankID: number) {
    this.getPetrolPumpTankLedger(this.pumpCode, new Date().toString(), tankID);
  }
  getTanksByID(petrolPumpCode: string) {
    this.userService.getTanksByID(petrolPumpCode).subscribe(data => {
      this.tank = data;
    });
  }
  getTankInfoWithLowLimit(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    // this.petrolPumpService.getPetrolPumpTankInfoOfLowLimit(pumpCode, date).subscribe(res => {
    //   this.pumpTanks = res;
    // });
    this.petrolPumpService.getPetrolPumpTankWithLowCapacity(pumpCode, date).subscribe(res => {
      this.pumpTanks = res;
    });
  }
  getPetrolPumpDailyFuelPriceChart(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpDailyFuelPriceChart(pumpCode, date).subscribe(res => {
      this.lineChartLabelsForFuelDailyPrice = new Array<any>();
      this.lineChartDataForFuelDailyPrice = new Array<any>();
      res.lstDates.forEach(element => {
        this.lineChartLabelsForFuelDailyPrice.push(this.datepipe.transform(element.toString(), 'yyyy-MM-dd'));
      });
      res.lstFuelLabelAndPriceArray.forEach(element => {
        this.lineChartDataForFuelDailyPrice.push(element);
      });
    });
  }

  getPetrolPumpCreditorLedgerChart(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpCreditorLedgerChart(pumpCode, date).subscribe(res => {
      this.lineChartLabelsForCreditor = new Array<any>();
      this.lineChartDataForCreditor = new Array<any>();
      res.lstDates.forEach(element => {
        this.lineChartLabelsForCreditor.push(this.datepipe.transform(element.toString(), 'yyyy-MM-dd'));
      });
      res.lstFuelLabelAndPriceArray.forEach(element => {
        this.lineChartDataForCreditor.push(element);
      });
    });
  }
  getPetrolPumpNozzleSaleChart(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.GetPetrolPumpNozzleSaleChart(pumpCode, date).subscribe(res => {
      this.lineChartLabelsForNozzleSale = new Array<any>();
      this.lineChartDataForNozzleSale = new Array<any>();
      res.lstDates.forEach(element => {
        this.lineChartLabelsForNozzleSale.push(this.datepipe.transform(element.toString(), 'yyyy-MM-dd'));
      });
      res.lstFuelLabelAndPriceArray.forEach(element => {
        this.lineChartDataForNozzleSale.push(element);
      });
    });
  }
  getPetrolPumpNozzleFuelSaleChart(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.GetPetrolPumpNozzleFuelSaleChart(pumpCode, date).subscribe(res => {
      this.lineChartLabelsForNozzleFuelSale = new Array<any>();
      this.lineChartDataForNozzleFuelSale = new Array<any>();
      res.lstDates.forEach(element => {
        this.lineChartLabelsForNozzleFuelSale.push(this.datepipe.transform(element.toString(), 'yyyy-MM-dd'));
      });
      res.lstFuelLabelAndPriceArray.forEach(element => {
        this.lineChartDataForNozzleFuelSale.push(element);
      });
    });
  }

  getPetrolPumpNozzleSaleForStaffChart(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpNozzleSaleForStaffChart(pumpCode, date).subscribe(res => {
      this.lineChartLabelsForNozzleForCreditorSale = new Array<any>();
      this.lineChartDataForNozzleForCreditorSale = new Array<any>();
      res.lstDates.forEach(element => {
        this.lineChartLabelsForNozzleForCreditorSale.push(this.datepipe.transform(element.toString(), 'yyyy-MM-dd'));
      });
      res.lstFuelLabelAndPriceArray.forEach(element => {
        this.lineChartDataForNozzleForCreditorSale.push(element);
      });
    });
  }

  getPetrolPumpTankLedger(pumpCode, readingDate, tankID) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpTankLedger(pumpCode, date, tankID).subscribe(res => {
      this.pumpTanksLedger = res;

      const dialogRef = this.dialog.open(TankLedgerformComponent, {
        data: { user: this.pumpTanksLedger },
        disableClose: true
      });
    });
  }
  getLubesWithLowLimit(pumpCode) {
    let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpLubesInfoOfLowLimit(pumpCode, date).subscribe(res => {
      this.pumpProductWithLubesPrise = res;
      this.pumpProductWithLubesPrise = this.pumpProductWithLubesPrise.filter(c => Number(c.InitialQuantity) < 1000)
    });
  }

  getCreditorInventory(pumpCode) {
    this.petrolPumpService.getPetrolPumpSpecificCreditorInventory(pumpCode).subscribe(res => {
      this.ApprovedCreditorInventory = res.filter(p => p.IsApproved == true);
      this.PendingCreditorInventory = res.filter(p => p.IsApproved == false);
    });
  }
  getPumpInfo(pumpCode) {
    let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpDashboardWithDate(pumpCode, date).subscribe(res => {
      this.pumpProduct = res.pp_PumpProduct;
      this.pumpProduct = this.pumpProduct.filter(c => c.CategoryID == 1);
      this.pumpUsers = res.pp_Users.filter(p => p.CreditLimit < 10000);
    });
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res) => {
      this.userData = res;
    });
  }
  getBasicInfo(pumpCode) {
    this.userService.getBasicInfo(pumpCode).subscribe((res) => {
      this.basicInfo = res;

      this.UserId = res.UserId;
      this.RoleID = res.RoleID;
      this.FullName = res.FullName;
      this.PetrolPumpName = res.PetrolPumpName;
      this.Address = res.Address;
      this.Address2 = res.Address2;
      this.City = res.City;
      this.State = res.State;
      this.PetrolPumpPincode = res.PetrolPumpPincode;
      this.PetrolPumpCode = res.PetrolPumpCode;

    });
  }
  getCreditLimit(pumpCode) {
    this.petrolPumpService.GetPetrolPumpCreditorNetCreditLimit(pumpCode).subscribe(res => {
      this.creditLimit = res;
    });
  }

  getPumpIncompleteDailyData(pumpCode) {
    this.petrolPumpService.getPumpIncompleteDailyData(pumpCode).subscribe(res => {
      this.incompleteDailyData = new IncompleteDailyData();
      this.incompleteProducts = res.IncompleteProducts;
      this.incompleteTanks = res.IncompleteTanks;
      this.incompleteNozzles = res.IncompleteNozzles;
      if (this.incompleteProducts && this.incompleteProducts.length > 0) {
        this.isPermit = false;
      }
      else {
        this.isPermit = true;
      }
    });
  }
  SetFuelPrice() {
    this.petrolPumpService.getPumpIncompleteDailyData(this.pumpCode).subscribe(res => {
      this.incompleteProducts = res.IncompleteProducts;
      this.incompleteTanks = res.IncompleteTanks;
      this.incompleteNozzles = res.IncompleteNozzles;
      if (this.incompleteProducts && this.incompleteProducts.length > 0) {
        const dialogRef = this.dialog.open(PriceAdjustmentFormComponent, {
          data: { incompleteProductDate: this.incompleteProducts[0].Date, pumpCode: this.pumpCode }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.SetFuelPrice();
        });
      }
      else {
        window.location.reload();
      }
    });

  }
  getPumpStatus(pumpCode) {
    this.petrolPumpService.getPumpStatus(pumpCode).subscribe(res => {
      this.pumpStatus = res;
      if (this.pumpStatus) {
        if (this.pumpStatus[0].Payment == 1 && this.pumpStatus[0].Tank == 1 && this.pumpStatus[0].Nozzle == 1
          && this.pumpStatus[0].Product == 1 && this.pumpStatus[0].User == 1 && this.pumpStatus[0].AdditionalInfo == 1
          && this.pumpStatus[0].BasicInfo == 1) {
          this.status = "Congratulation! Your Petrol pump set up is Complete."
          this.countStatus = 1;
        }
        else {
          this.status = "Petrol pump set up is In Progress."
          this.countStatus = 0;
        }
      }
    });
  }



  //   savePumpInfo() {
  //     this.petrolPumpService.updatePetrolPumpInfo(this.pumpInfoForm.value).subscribe(res => {
  //       this.toasterService.pop('success', '', 'Pump details updated successfully.');
  //     });
  //   }
  //   getUserInfo() {
  //     this.petrolPumpService.getUserDetail().subscribe((res) => {
  //       this.userData = res;
  //       this.DisableControlsByRoleID(this.userData.RoleID);
  //     }
  // ,
  //   (err) => {
  //     this.alertService.error(err);
  //   }
  //     );
  //   }

  //   DisableControlsByRoleID(roleID: number) {
  //     this.RoleID = roleID;
  //     // if (roleID != -2) {
  //     //   this.pumpInfoForm.controls["PetrolPumpName"].disable();
  //     //   this.pumpInfoForm.controls["OwnerName"].disable();
  //     //   this.pumpInfoForm.controls["Email"].disable();
  //     //   this.pumpInfoForm.controls["Mobile"].disable();
  //     // }
  //   }
}
