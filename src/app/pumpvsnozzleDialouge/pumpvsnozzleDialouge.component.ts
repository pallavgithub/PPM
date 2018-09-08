import { UserService } from '../_services/user.service';
import { Component, OnInit, NgModule, Output, EventEmitter, Input, Inject } from '@angular/core';
import { pp_User } from '../_models/pp_User';
import { FormsModule, FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms'
import { Role } from '../_models/Role';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Router, NavigationEnd, Params, ActivatedRoute } from '@angular/router';
import { PaymentType } from '../_models/PaymentType';
import { DatePipe } from '../../../node_modules/@angular/common';
import { pp_Tank } from '../_models/pp_Tank';
import { TankVsNozzle } from '../_models/TankVsNozzle';

@Component({
  selector: 'pumpvsnozzleDialouge.component',
  templateUrl: './pumpvsnozzleDialouge.component.html',
  styleUrls: ['./pumpvsnozzleDialouge.component.css']
})
export class PumpVsNozzleDialougeComponent implements OnInit {
  pumpTanksLedger: pp_Tank[];
  tanksale: TankVsNozzle[]; 
  public pumpCode: string;
  tankName:String;
 tankSale:number;
 nozzleSale:number;
 navigationSubscription;
  
  constructor(private toasterService: ToasterService, public dialog: MatDialog, private router: Router,private activatedRoute: ActivatedRoute, private userService: UserService, private _formBuilder: FormBuilder, private petrolPumpService: PetrolPumpService, @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<PumpVsNozzleDialougeComponent>, public datepipe: DatePipe) {
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
    // this.petrolPumpService.GetFuelSaleComparisionDetails(this.data.pumpcode, this.data.saleDate,this.data.tankid).subscribe(res => {
    //     this.tanksale = res;
    // });    
    this.tanksale = this.data.saleData;
     this.nozzleSale=0;
     this.data.saleData.forEach(element => {
         this.nozzleSale += element.NozzleFuelSale;
        });
   this.tankName=this.data.saleData[0].TankName;
    this.tankSale=this.data.saleData[0].TankClosingStock;


    
    //this.tankOpeningStock=this.data.user[0].OpeningStock;
   // this.tankClosingStock=this.data.user[this.data.user.length-1].ClosingStock;
    // this.tanksale.forEach(element => {
    //   element.ReadingDate = this.datepipe.transform((new Date(element.ReadingDate).toString()), 'yyyy-MM-dd');
    // });
  }
}
