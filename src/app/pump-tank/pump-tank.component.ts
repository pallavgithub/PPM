

import { UserService } from "../_services/user.service";
import { Component, OnInit, Input, ViewContainerRef } from "@angular/core";
import { FormDataService } from "../_services/pumpRegister.service";
import { Router } from "@angular/router";
import { pp_Tank } from "../_models/pp_Tank";
import { ReadingType } from '../_models/ReadingType';
import { MatDialog } from "@angular/material";
import { TankformComponent } from "../tankform/tankform.component";
import { FuelType } from "../_models/FuelType";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from "../../../node_modules/@angular/common";
import { ToasterService } from 'angular2-toaster';
import { UserInfo } from "../_models/UserInfo";

@Component({
  selector: "pump-tank",
  templateUrl: "./pump-tank.component.html",
  styleUrls: ["./pump-tank.component.css"]
})
export class PumpTankComponent implements OnInit {
  @Input() pumpTanks: pp_Tank[];
  fuelTypes: FuelType[];
  public userData: UserInfo;
  readingTypes: ReadingType[];
  public isCollapsed = false;
  @Input() pumpCode: string;
  constructor(
    public dialog: MatDialog, private userService: UserService,private router:Router, private toasterService: ToasterService,private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    //this.getAllFuelType();
    //this.getAllProducts();
    //this.getReadingType();
    this.getUserDate();
  }

  getReadingType() {
    this.userService.getReadingType().subscribe(data => {
      this.readingTypes = data;
    });
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res) => {
      this.userData = res;
    });    
  }

  getAllFuelType() {
    this.userService.getAllFuelType().subscribe(data => {
      this.fuelTypes = data;
    });
  }

  getAllProducts() {
    this.userService.getAllProducts().subscribe(data => {
      this.fuelTypes = data;
    });
  }

  getTankFuelType(fuelTypeID: number) {
    if(fuelTypeID == 0)
    {
      this.fuelTypes = new Array<FuelType>();
    }
    var fuelType = this.fuelTypes.find(c => c.ID == fuelTypeID);
    return fuelType ? fuelType.Name : '';
  }

  getReadingByID(readingTypeID: number) {
    if(readingTypeID == 0)
    {
      this.readingTypes = new Array<ReadingType>();
    }
    var readingType = this.readingTypes.find(c => c.ID == readingTypeID);
    return readingType ? readingType.Name : '';
  }

  editTank(tank: pp_Tank) {
    // var datePipe = new DatePipe("en-US");
    // tank.ReadingDate = datePipe.transform(tank.ReadingDate, 'dd-mm-yyyy');
    tank.IsEditModal = true;
    this.userService.getTankReadingByTankID(tank.ID,this.pumpCode).subscribe(data => {
      tank.pp_TankReading = data;
      const dialogRef = this.dialog.open(TankformComponent, {
        data: { tank }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
    
  }
  moveToNext()
  {
    this.viewContainerRef[ '_data' ].componentView.parent.component.selectedTab=6;
  }
  DeleteTank(tank: pp_Tank) {
    if (confirm("Do you want to delete this Tank?")) {
      this.userService.deleteTank(tank).subscribe((res: any) => {
        this.toasterService.pop('success', '', res.Result.toString());
        this.router.navigate(['/pumpDetails', this.pumpCode]);
      },
        (err) => {

        });
    }
  }
}
