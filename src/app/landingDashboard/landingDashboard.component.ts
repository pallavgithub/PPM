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
import { DailyTankReadingDialogComponent } from '../dailyTankReadingDialog/dailyTankReadingDialog.component';
import { DailyNozzleReadingDialogComponent } from '../dailyNozzleReadingDialog/dailyNozzleReadingDialog.component';
import { ProductSale } from '../_models/ProductSale';
import { PaymentLedger } from '../_models/PaymentLedger';


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
  public allProductSale : ProductSale[];
  public workingCapital : PaymentLedger[];
  public msgProduct: string;
  public ApprovedCreditorInventory: CreditorInventory[];
  public PendingCreditorInventory: CreditorInventory[];
  public msgTank: string;
  public creditLimit: string;
  public msgNozzle: string;
  public isPermit: boolean;
  public isPermitTank: boolean;  
  public isPermitNozzle: boolean;
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
  public WorkingcapitalList: any;
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
    responsive: false,
    showXLabels: 5
  };
  public lineChartColorsForFuelDailyPrice: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: 'yellow',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'green',
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
  public capitalchartdata : Array<any> = [{
           data: []
       } ];
  public capitalchartlabel: Array<any> = [ ];
  public tankchartdata : Array<any> = [{
    label:'Tank',
    data: []
} ];
public tankchartlabel: Array<any> = [ ];
  public lineChartLabelsForNozzleForCreditorSale: Array<any> = [];
  public lineChartOptionsForNozzleForCreditorSale: any = {
    responsive: true
  };
  public capitalChartoptions: any = {
    responsive: true
};
public tankChartoptions: any = {
  responsive: true
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
  public capitalchartcolor: Array<any> = [
    { // grey
      backgroundColor: [
        "#fc4f1e",
        "#f4ba2b",
        "#77b937",
        "#FF45bb"
    ],
    hoverBackgroundColor: ['#d2370b', '#c89108', '#60a021',"#FF45bb"]
    }];
    public tankchartcolors = [
      { 
        backgroundColor: []
      }
    ]
  public lineChartLegendForNozzleForCreditorSale: boolean = true;
  public lineChartTypeForNozzleForCreditorSale: string = 'line';

  navigationSubscription;
  status: string;
  public userData: UserInfo;
  public basicInfo: BasicInfo;
  countStatus: number;
 public TotalSale:number;
 pumpDate:string;
 fromDate:string;
 toDate:string;
 showcustom:string;
 dateFilter:number;

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
    this.petrolPumpService.globalLoader=true;
    this.dateFilter=1;
    if (this.pumpCode && this.pumpCode != '') {
      this.pumpDate = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
      this.fromDate = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
      this.toDate = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
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
      this.getPetrolPumpNozzleSaleChart(this.pumpCode, new Date().toString(),0);
      this.getPetrolPumpNozzleFuelSaleChart(this.pumpCode, new Date().toString(),0);
      this.getPetrolPumpNozzleSaleForStaffChart(this.pumpCode, new Date().toString());
      this.getTanksByID(this.pumpCode);
     // this.allProductSale=this.allProductSale;
      this.GetAllProductSale(this.pumpCode);
      this.GetworkingCapital(this.pumpCode);   
      
     
    }

    // this.pumpLandingForm = this._formBuilder.group({
    //   PetrolPumpCode: [this.pumpStatus.PetrolPumpCode]      
    // });
    //this.getUserInfo();
  }
  OpenTankLedgerDialog(tankID: number) {
    this.getPetrolPumpTankLedger(this.pumpCode, new Date().toString(), tankID);
  }
  GetAllProductSale(petrolPumpCode: string) {
    this.TotalSale=0;
    this.petrolPumpService.getAllProductSale(petrolPumpCode,1,this.fromDate,this.toDate).subscribe((res:any) => {
      this.allProductSale = res;   
      res.forEach(element=>{
        this.TotalSale+=<number>element.TotalPrice;
      });
    });
   
  }
  ChangeSaleValue(event)
  {
    debugger
    this.dateFilter=event.target.value;
    
    this.TotalSale=0;
    if(event.target.value=8)
    {
      this.showcustom="show";
      return false;
    }  
    else{
      this.showcustom=null;
    }  
    this.petrolPumpService.getAllProductSale(this.pumpCode,event.target.value,this.fromDate,this.toDate).subscribe((res:any) => {
      this.allProductSale = res;   
      res.forEach(element=>{
        this.TotalSale+=<number>element.TotalPrice;
      });
    });
  }
  GetworkingCapital(petrolPumpCode: string) {
debugger
    this.petrolPumpService.GetWorkingCapital(petrolPumpCode,true).subscribe((res:any) => {
      this.capitalchartdata = []
      if(res != null) {
        this.capitalchartlabel.push(...res.lstLabel);        
        this.capitalchartdata.push({'data':res.lstCapitalLabelAndAmount.data})
      }      
    });
    this.petrolPumpService.GetWorkingCapital(petrolPumpCode,false).subscribe((res:any) => {
     this.petrolPumpService.globalLoader=false;
      this.WorkingcapitalList=res;
    });
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
    // this.petrolPumpService.getPetrolPumpTankWithLowCapacity(pumpCode, date).subscribe(res => {
    //   this.pumpTanks = res;
    //   this.pumpTanks = this.pumpTanks.filter(p=>Number(p.OpeningStock) < 1000);
    // });


    this.userService.GetTankWithCapacity(pumpCode).subscribe(data => {
      
      this.pumpTanks = data.filter(p=>p.Stock < 10000);
     // this.tankchartlabel = [];
      this.tankchartdata = [{
        label:'Tank',
        data:[]
      }
      ];
      if(data != null) {
        data.forEach(element=>{
          /*work is done now  check css of header and nabar of whole app */
         this.tankchartcolors[0].backgroundColor.push(element.Stock < 10000 ? 'red' : 'green')
         this.tankchartlabel.push(element.TankName);
         this.tankchartdata[0].data.push(element.Stock);
        });        
        //this.capitalchartdata.push({'data':data.lstCapitalLabelAndAmount.data})
      }

    });

  }
  getPetrolPumpDailyFuelPriceChart(pumpCode, readingDate) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpDailyFuelPriceChart(pumpCode, date).subscribe(res => {
      this.lineChartLabelsForFuelDailyPrice = new Array<any>();
      this.lineChartDataForFuelDailyPrice = new Array<any>();
      res.lstDates.forEach(element => {
        this.lineChartLabelsForFuelDailyPrice.push(this.datepipe.transform(element.toString(), 'yyyy-MM-dd'));
        
        //this.doughnutchartlabel.push(this.datepipe.transform(element.toString(), 'yyyy-MM-dd'));
      });
      res.lstFuelLabelAndPriceArray.forEach(element => {
        this.lineChartDataForFuelDailyPrice.push(element);
        //this.doughnutchartdata.push(element);
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
  getPetrolPumpNozzleSaleChart(pumpCode, readingDate,value) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.GetPetrolPumpNozzleSaleChart(pumpCode, date,value).subscribe(res => {
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
  ChangeChartNozzle(value:number)
  {
    let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.getPetrolPumpNozzleSaleChart(this.pumpCode,date,value);
  }
  ChangeChartFuel(value:number)
  {
    let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.getPetrolPumpNozzleFuelSaleChart(this.pumpCode,date,value);
  }
  
  getPetrolPumpNozzleFuelSaleChart(pumpCode, readingDate,value) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.GetPetrolPumpNozzleFuelSaleChart(pumpCode, date,value).subscribe(res => {
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
      this.pumpUsers = res.pp_Users;
    });
  }
  onProductBlurDate(event) {
    this.petrolPumpService.getPetrolPumpDashboardWithDate(this.pumpCode, event.target.value).subscribe(res => {
      this.pumpProduct = res.pp_PumpProduct;
      this.pumpProduct = this.pumpProduct.filter(c => c.CategoryID == 1);
      this.pumpUsers = res.pp_Users;
    });    
  }
  changeSaleFromDate(event)
  {
    this.fromDate=event.target.value;
  }
  changeSaleToDate(event)
  {
    debugger
    this.toDate=event.target.value;
    this.TotalSale=0;
    this.petrolPumpService.getAllProductSale(this.pumpCode,this.dateFilter,this.fromDate,this.toDate).subscribe((res:any) => {
      this.allProductSale = res;   
      res.forEach(element=>{
        this.TotalSale+=<number>element.TotalPrice;
      });
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
      if ((this.incompleteProducts && this.incompleteProducts.length > 0) )
       {       this.isPermit = false;
      }
      else {
        this.isPermit = true;
      }
      if ( ( this.incompleteTanks && this.incompleteTanks.length > 0 ))
       {       this.isPermitTank = false;
      }
      else {
        this.isPermitTank = true;
      }
      if ( ( this.incompleteNozzles && this.incompleteNozzles.length > 0 ))
       {       this.isPermitNozzle = false;
      }
      else {
        this.isPermitNozzle = true;
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
  
  SetTankReading() {
    this.petrolPumpService.getPumpIncompleteDailyData(this.pumpCode).subscribe(res => {
      this.incompleteProducts = res.IncompleteProducts;
      this.incompleteTanks = res.IncompleteTanks;
      this.incompleteNozzles = res.IncompleteNozzles;
      if (this.incompleteTanks && this.incompleteTanks.length > 0) {
        const dialogRef = this.dialog.open(DailyTankReadingDialogComponent, {
          data: { incompleteTanks: this.incompleteTanks[0].Date, pumpCode: this.pumpCode }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.SetTankReading();
        });
      }
      else {
        window.location.reload();
      }
    });

  }
  SetNozzleReading()
  {
    this.petrolPumpService.getPumpIncompleteDailyData(this.pumpCode).subscribe(res => {
      this.incompleteProducts = res.IncompleteProducts;
      this.incompleteTanks = res.IncompleteTanks;
      this.incompleteNozzles = res.IncompleteNozzles;
      if (this.incompleteNozzles && this.incompleteNozzles.length > 0) {
        const dialogRef = this.dialog.open(DailyNozzleReadingDialogComponent, {
          data: { incompleteNozzles: this.incompleteNozzles[0].Date, pumpCode: this.pumpCode }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.SetNozzleReading();
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
