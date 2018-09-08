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

@Component({
  selector: 'app-nozzle-ledger.component',
  templateUrl: './nozzle-ledger.component.html',
  styleUrls: ['./nozzle-ledger.component.css']
})
export class NozzleLedgerComponent implements OnInit {

  public pumpCode: string;
  tank: pp_Tank[];  
  public pumpTanksLedger: pp_Tank[];
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
    this.pumpTanksLedger=this.pumpTanksLedger;
    this.GetTankWithCapacity(this.pumpCode);
   
  }
  // getTanksByID(petrolPumpCode: string) {
  //   this.userService.getTanksByID(petrolPumpCode).subscribe(data => {
  //     this.tank = data;
  //   });
  // }
  GetTankWithCapacity(petrolPumpCode: string)
  {
    this.userService.GetTankWithCapacity(petrolPumpCode).subscribe(data => {
      this.tank = data;
    });
  }
  getPetrolPumpTankWithLowCapacity2(petrolPumpCode: string) {
    let date: string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpTankWithLowCapacity2(petrolPumpCode,date).subscribe(data => {
      this.tank = data;
    });
  }
  OpenTankLedgerDialog(tankID: number) {
    this.getPetrolPumpTankLedger(this.pumpCode, new Date().toString(), tankID);
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
}
