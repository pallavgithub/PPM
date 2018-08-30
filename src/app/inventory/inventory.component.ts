
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { UserService } from '../_services';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AllProduct } from '../AllProduct';
import { Unit } from '../_models/Unit';
import { pp_Inventory } from '../_models/pp_Inventory';
import {InventoryDialogFormComponent} from '../inventoryDialog/inventoryDialog.component';

@Component({
  selector: 'pump-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  @Input() pumpProduct: pp_PumpProduct[];
  @Input() pumpCode: string;
  //allProducts: AllProduct[];
  //listPumpProduct: pp_PumpProduct[];
  //units: Unit[];
  constructor(private router:Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService) {
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
    //this.getAllProducts();
    //this.getAllUnits();
    //this.pumpProduct = this.pumpProduct.filter(c=>c.CategoryID != 3);
  }
  editProduct(pumpProductNew: pp_PumpProduct) {
    pumpProductNew.IsEditModal = true;
    pumpProductNew.Unit = 0;
    pumpProductNew.InitialQuantity = '';
    pumpProductNew.DateStockMeasuredOn = new Date().toString();
    const dialogRef = this.dialog.open(InventoryDialogFormComponent, {
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
