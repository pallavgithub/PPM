
import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { UserService } from '../_services';
import { ProductDialogFormComponent } from '../productDialog/productDialog.component';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AllProduct } from '../AllProduct';
import { Unit } from '../_models/Unit';
import { UserInfo } from '../_models/UserInfo';
import { PetrolPumpService } from '../_services/petrolpump.service';

@Component({
  selector: 'pump-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() pumpProduct: pp_PumpProduct[];
  @Input() pumpCode: string;
  public userData: UserInfo;
  licenseStartDate:string;
  allProducts: AllProduct[];
  units: Unit[];
  constructor(private router:Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService,private petrolPumpService: PetrolPumpService,private viewContainerRef: ViewContainerRef) {

  }
  getProductName(ID) { 
    if(ID == 0)
    {
      this.allProducts = new Array<AllProduct>();
    }   
    var product = this.allProducts.find(c => c.ID == ID);
    return product ? product.Name : '';
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res) => {
      this.userData = res;
    });    
  }

  moveToNext()
  {
    this.viewContainerRef[ '_data' ].componentView.parent.component.selectedTab=3;
  }
  getLicenseStartDate(isOld:number) {
    this.petrolPumpService.GetLicenseStartDate(this.pumpCode,isOld).subscribe(data => {
      this.licenseStartDate = data;
    });
  }

  getUnitName(ID) {   
    if(ID == 0)
    {
      this.units = new Array<Unit>();
    }   
    var unitName = this.units.find(c => c.ID == ID);
    return unitName ? unitName.Name : '';
  }


  ngOnInit() {
    //this.getAllProducts();
    //this.getAllUnits();
    this.getUserDate();
    this.getLicenseStartDate(1);
  }
  editProduct(pumpProductNew: pp_PumpProduct) {
    pumpProductNew.IsEditModal = true;
    const dialogRef = this.dialog.open(ProductDialogFormComponent, {
      data: { pumpProductNew:pumpProductNew,petrolPumpCode:this.pumpCode, licenseStartDate:this.licenseStartDate }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });
  }
  getAllUnits() {
    this.userService.getAllUnits().subscribe(data => {
      this.units = data;
    });
  }
  getAllProducts() {
    this.userService.getAllProducts().subscribe(data => {
      this.allProducts = data;
    });
  }
  removeUser(i: number) {
    //this.pumpUsers.splice(i, 1);
  }

  // ChangePassword(user: pp_User) {
  //   const dialogRef = this.dialog.open(ChangePasswordComponent, {
  //     data: { user }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }
  DeleteProduct(product: pp_PumpProduct) {
    if (confirm("Do you want to delete this product?")) {
      this.userService.deleteProduct(product).subscribe((res: any) => {
        this.toasterService.pop('success', '', res.Result.toString());
        this.router.navigate(['/pumpDetails',this.pumpCode]);
      },
        (err) => {

        });
      

    }
  }
}
