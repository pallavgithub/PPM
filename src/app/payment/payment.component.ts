
import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { pp_PumpProduct } from '../_models/pp_PumpProduct';
import { UserService } from '../_services';
import { ProductDialogFormComponent } from '../productDialog/productDialog.component';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AllProduct } from '../AllProduct';
import { Unit } from '../_models/Unit';
import { pp_Payment } from '../_models/pp_Payment';
import { PaymentDialogFormComponent } from '../paymentDialog/paymentDialog.component';
import { PaymentType } from '../_models/PaymentType';

@Component({
  selector: 'pump-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() pumpPayment: pp_Payment[];
  @Input() pumpCode: string;
  paymentTypes: PaymentType[];
  //allProducts: AllProduct[];
  //units: Unit[]
  constructor(private router:Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService,private viewContainerRef: ViewContainerRef) {

  }
  // getProductName(ID) {    
  //   var product = this.allProducts.find(c => c.ID == ID);
  //   return product ? product.Name : '';
  // }

  getPaymentTypeName(ID) { 
    if(ID == 0)
    {
      this.paymentTypes = new Array<PaymentType>();
    }   
    var paymentTypeName = this.paymentTypes.find(c => c.ID == ID);
    return paymentTypeName ? paymentTypeName.Name : '';
  }
  moveToNext()
  {
    this.viewContainerRef[ '_data' ].componentView.parent.component.selectedTab=4;
  }

  ngOnInit() {
    //this.getAllPaymentType();
    // this.getAllProducts();
    // this.getAllUnits();
  }
  editProduct(pumpPaymentNew: pp_Payment) {
    pumpPaymentNew.IsEditModal = true;
    const dialogRef = this.dialog.open(PaymentDialogFormComponent, {
      data: { pumpPaymentNew }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });
  }
  getAllPaymentType() {
    this.userService.getAllPaymentType().subscribe(data => {
      this.paymentTypes = data;
    });
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
  DeleteProduct(payment: pp_Payment) {
    if (confirm("Do you want to delete this payment type?")) {
      this.userService.deletePayment(payment).subscribe((res: any) => {
        this.toasterService.pop('success', '', res.Result.toString());
        this.router.navigate(['/pumpDetails',this.pumpCode]);
      },
        (err) => {

        });
      

    }
  }
}
