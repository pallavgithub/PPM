import { Component, OnInit } from '@angular/core';
import { Router, Params, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { UserService } from '../_services';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { FormBuilder } from '@angular/forms';
import { Tank } from '../_models/Tank';
import { TankLedgerformComponent } from '../tankLedger/tankLedger.component';
import { DatePipe } from '@angular/common';
import { pp_Tank } from 'src/app/_models/pp_Tank';
import { TankVsNozzle } from '../_models/TankVsNozzle';
import { PumpVsNozzleDialougeComponent } from '../pumpvsnozzleDialouge/pumpvsnozzleDialouge.component';

@Component({
  selector: 'app-pumpvsnozzlecomponent',
  templateUrl: './pumpvsnozzle.component.html',
  styleUrls: ['./pumpvsnozzle.component.css']
})
export class PumpVsNozzleComponent implements OnInit {

  public pumpCode: string;
  tank: TankVsNozzle[];
  tankSale: TankVsNozzle[];  
  pumpDate:string;
  public pumpNozzle: pp_Tank[];
  navigationSubscription;

  constructor(private router:Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService,private activatedRoute: ActivatedRoute,private petrolPumpService: PetrolPumpService,private _formBuilder: FormBuilder, public datepipe: DatePipe) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pumpCode = params['pumpCode'];
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.petrolPumpService.globalLoader=true;
    let currentDate:Date = new Date();
    let date:string = this.datepipe.transform(new Date(currentDate.setDate(currentDate.getDate() - 1)), 'yyyy-MM-dd');   
    this.pumpDate = this.datepipe.transform(date, 'yyyy-MM-dd');    
    console.log({'date':date, 'yester':new Date(currentDate.setDate(currentDate.getDate() - 1)),'pump':this.pumpCode})

    this.GetTankVsNozzleSale(this.pumpCode, this.pumpDate);
   
  }
  
  GetTankVsNozzleSale(petrolPumpCode: string, date)
  {
    //let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.petrolPumpService.GetFuelSaleComparision(petrolPumpCode,date).subscribe(data => {
      this.petrolPumpService.globalLoader=false;
      this.tank = data;
    });
  }
  onBlurDate(event) {    
    this.GetTankVsNozzleSale(this.pumpCode,  event.target.value);
  }

  OpenDifferenceDetailDialog(tankID: number) {
    let date: string = this.datepipe.transform( this.pumpDate, 'yyyy-MM-dd');
    this.getPetrolPumpTankLedger(this.pumpCode, date, tankID);
  }
  
  getPetrolPumpTankLedger(pumpCode, readingDate, tankID) {
    this.petrolPumpService.globalLoader=true;
    let date: string = this.datepipe.transform( readingDate, 'yyyy-MM-dd');
    this.petrolPumpService.GetFuelSaleComparisionDetails(pumpCode, date,tankID).subscribe(res => {
      this.tankSale = res;
  }); 
    this.petrolPumpService.GetFuelSaleComparision(pumpCode, date).subscribe(res => {
      this.petrolPumpService.globalLoader=false;
      this.tank = res;
      const dialogRef = this.dialog.open(PumpVsNozzleDialougeComponent, {
        data: { saleData: this.tankSale},
        disableClose: true
      });
    });
  }
}
