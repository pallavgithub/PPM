
import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { UserService } from '../_services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { AllProduct } from '../AllProduct';
import { Unit } from '../_models/Unit';
import { pp_Inventory } from '../_models/pp_Inventory';
import { InventoryDialogFormComponent } from '../inventoryDialog/inventoryDialog.component';
import { InventoryLubesPriceDialogFormComponent } from '../inventoryLubesPriceDialog/inventoryLubesPriceDialog.component';
import { pp_Tank } from '../_models/pp_Tank';
import { InventoryFuelTankDialogFormComponent } from '../inventoryFuelTankDialog/inventoryFuelTankDialog.component';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { UserDetail } from '../_models/userDetail';
import { UserInfo } from '../_models/UserInfo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pump-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  // @Input() pumpProduct: pp_PumpProduct[];
  // @Input() pumpProductWithLubesPrise: pp_PumpProduct[];
  // @Input() pumpTanks: pp_Tank[];
  // @Input() pumpCode: string;

  public pumpProduct: pp_PumpProduct[];
  public pumpProductWithLubesPrise: pp_PumpProduct[];
  public pumpTanks: pp_Tank[];
  public pumpCode: string;
  public userData:UserInfo;
  navigationSubscription;

  //allProducts: AllProduct[];
  //listPumpProduct: pp_PumpProduct[];
  //units: Unit[];
  constructor(private router: Router, private toasterService: ToasterService, public dialog: MatDialog, public dialog2: MatDialog, private userService: UserService,private activatedRoute: ActivatedRoute, private petrolPumpService: PetrolPumpService,public datepipe: DatePipe) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pumpCode = params['pumpCode'];
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
    //this.listPumpProduct = this.pumpProduct;
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
    if (this.pumpCode && this.pumpCode != '') {
      this.getPumpInfo(this.pumpCode);  
      this.getUserDate();
    }
    //this.getAllProducts();
    //this.getAllUnits();
    //this.pumpProduct = this.pumpProduct.filter(c=>c.CategoryID != 3);
  }
  getPumpInfo(pumpCode) {
    let date:string = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.petrolPumpService.getPetrolPumpDashboardWithDate(pumpCode,date).subscribe(res => {
      this.pumpTanks = res.pp_Tanks;
      this.pumpProduct = res.pp_PumpProduct;
      this.pumpProductWithLubesPrise = res.pp_PumpProductWithLubesPrise; 
      this.pumpProductWithLubesPrise = this.pumpProductWithLubesPrise.filter(c => c.CategoryID != 3)     
    });
  }
  // ngOnChanges(changes: SimpleChange) {
  //   // changes['pumpProduct']
  //   this.pumpProduct = changes["pumpProduct"].currentValue;
  //   if (this.pumpProduct != null && this.pumpProduct != undefined && this.pumpProduct.length > 0) {
  //     this.pumpProduct = this.pumpProduct.filter(c => c.CategoryID != 3)
  //   }

  //   this.pumpProductWithLubesPrise = changes["pumpProductWithLubesPrise"].currentValue;
  //   if (this.pumpProductWithLubesPrise != null && this.pumpProductWithLubesPrise != undefined && this.pumpProductWithLubesPrise.length > 0) {
  //     this.pumpProductWithLubesPrise = this.pumpProductWithLubesPrise.filter(c => c.CategoryID != 3)
  //   }
  //   if (this.pumpTanks != null && this.pumpTanks != undefined && this.pumpTanks.length > 0) {
  //     this.pumpTanks = changes["pumpTanks"].currentValue;
  //   }

  // }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res)=>{
      this.userData=res;
    });
}
  editProduct(pumpProductNew: pp_PumpProduct) {
    pumpProductNew.IsEditModal = true;
    pumpProductNew.InitialQuantity = '';
    // pumpProductNew.DateStockMeasuredOn = new Date().toString();
    if (pumpProductNew.CategoryID == 2) {
      const dialogRef1 = this.dialog.open(InventoryDialogFormComponent, {
        data: { pumpProductNew: pumpProductNew }
      });
    }
    else {
      const dialogRef2 = this.dialog2.open(InventoryFuelTankDialogFormComponent, {
        data: { pumpProductNew: pumpProductNew, pumpTanks: this.pumpTanks, pumpCode: this.pumpCode }
      });
    }
    // dialogRef.afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });
  }

  editProductPrice(pumpProductNew: pp_PumpProduct) {
    pumpProductNew.IsEditModal = true;    
    // pumpProductNew.PurchaseRate = '';
    // pumpProductNew.SaleRate = '';
    //pumpProductNew.DateStockMeasuredOn = new Date().toString();
    const dialogRef = this.dialog.open(InventoryLubesPriceDialogFormComponent, {
      data: { pumpProductNew }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });
  }
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
  //   this.pumpUsers.splice(i, 1);
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
