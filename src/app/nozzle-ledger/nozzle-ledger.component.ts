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
import { pp_Nozzle } from '../_models/pp_Nozzle';
import { NozzleLedgerformComponent } from '../nozzle-ledger-form/nozzle-ledger-form.component';

@Component({
  selector: 'app-nozzle-ledger.component',
  templateUrl: './nozzle-ledger.component.html',
  styleUrls: ['./nozzle-ledger.component.css']
})
export class NozzleLedgerComponent implements OnInit {

  public pumpCode: string;
  public pumpNozzles: pp_Nozzle[];
  public pumpNozzlesLedger: pp_Nozzle[];
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
    this.pumpNozzlesLedger=this.pumpNozzlesLedger;
    this.GetNozzleInfo(this.pumpCode,new Date().toString());
   
  }
  
  GetNozzleInfo(petrolPumpCode, date)
  {
    let readingdate: string = this.datepipe.transform(date.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpNozzleInfoWithDailyEntry(petrolPumpCode,readingdate).subscribe(data => {
      this.pumpNozzles = data;
      debugger
    });
  }
 
  OpenNozzleLedgerDialog(nozzleID: number) {
    this.getPetrolPumpNozzleLedger(this.pumpCode, new Date().toString(), nozzleID);
  }
  
  getPetrolPumpNozzleLedger(pumpCode, readingDate, nozzleID) {
    let date: string = this.datepipe.transform(readingDate.toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpNozzleLedger(pumpCode, date, nozzleID).subscribe(res => {
      this.pumpNozzlesLedger = res;

      const dialogRef = this.dialog.open(NozzleLedgerformComponent, {
        data: { nozzle: this.pumpNozzlesLedger },
        disableClose: true
      });
    });
  }
}
