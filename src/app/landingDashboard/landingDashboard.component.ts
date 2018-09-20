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
  public creditLimit:string;
  public msgNozzle: string;
  public isPermit: boolean;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
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
  constructor(private toasterService: ToasterService, private _formBuilder: FormBuilder, private router: Router, private petrolPumpService: PetrolPumpService, private activatedRoute: ActivatedRoute, private userService: UserService, public dialog: MatDialog,public datepipe: DatePipe) {
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
      this.getBasicInfo();
      this.getCreditLimit(this.pumpCode);
      this.getPumpIncompleteDailyData(this.pumpCode);
      this.getPumpInfo(this.pumpCode);
      this.getCreditorInventory(this.pumpCode);
      //this.SetFuelPrice();
    }

    // this.pumpLandingForm = this._formBuilder.group({
    //   PetrolPumpCode: [this.pumpStatus.PetrolPumpCode]      
    // });
    //this.getUserInfo();
  }
  getCreditorInventory(pumpCode) {
    this.petrolPumpService.getPetrolPumpSpecificCreditorInventory(pumpCode).subscribe(res => {
      this.ApprovedCreditorInventory = res.filter(p=>p.IsApproved == true);
      this.PendingCreditorInventory = res.filter(p=>p.IsApproved == false);
    });
  }
  getPumpInfo(pumpCode) {
    let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpDashboardWithDate(pumpCode, date).subscribe(res => {
      this.pumpProduct = res.pp_PumpProduct;
      this.pumpProduct = this.pumpProduct.filter(c => c.CategoryID == 1);
    });
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res) => {
      this.userData = res;
    });    
  }
  getBasicInfo()
  {
    this.userService.getBasicInfo().subscribe((res)=>{
      this.basicInfo=res;
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
  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
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
