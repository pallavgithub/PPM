
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { pp_User } from '../_models/pp_User';
import { UserService } from '../_services';
import { Role } from '../_models/Role';
import { UserformComponent } from '../userform/userform.component';
import { ChangePasswordComponent } from '../ChangePassword/ChangePassword.Component';
import { ToasterService } from 'angular2-toaster';
import { AlertService } from '../_services/alert.service';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CreditorformComponent } from '../creditorform/creditorform.component';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { CreditorInventory } from '../_models/CreditorInventory';
import { CreditorFuelRequestFormComponent } from '../creditorFuelRequestForm/creditorFuelRequestForm.component';
import { UserDetail } from '../_models/userDetail';
import { UserInfo } from '../_models/UserInfo';
import {CreditorLedger} from '../_models/CreditorLedger';

@Component({
  selector: 'pump-creditorLedger',
  templateUrl: './creditorLedger.component.html',
  styleUrls: ['./creditorLedger.component.css']
})
export class CreditorLedgerComponent implements OnInit {
  // @Input() pumpUsers: pp_User[];
  // @Input() pumpCode: string;

  public pumpUsers: CreditorInventory[];
  public creditorLedger: CreditorLedger[];
  public pumpCode: string;
  public userData:UserInfo;
  public creditLimit:string;
  navigationSubscription;

  roles: Role[];
  constructor(private router:Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService,private activatedRoute: ActivatedRoute,private petrolPumpService: PetrolPumpService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pumpCode = params['pumpCode'];
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }
  getUserRole(roleId) {
    if(roleId == 0)
    {
      this.roles = new Array<Role>();
    }
    var userRole = this.roles.find(c => c.ID == roleId);
    return userRole ? userRole.Name : '';
  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res)=>{
      this.userData=res;
    });
}


  ngOnInit() {
    if (this.pumpCode && this.pumpCode != '') {
      //this.getUserInfo();
      this.getPumpInfo(this.pumpCode);
      this.getCreditLimit(this.pumpCode);
       this.getUserDate();
    }
    //this.getAllRoles();
  }
  getPumpInfo(pumpCode) {
    // this.petrolPumpService.getPetrolPumpSpecificCreditorInventory(pumpCode).subscribe(res => {
    //   this.pumpUsers = res;
    // });
    this.petrolPumpService.GetCreditorLedger(pumpCode).subscribe(res => {
      this.creditorLedger = res;
    });
  }
  getCreditLimit(pumpCode) {
    this.petrolPumpService.GetPetrolPumpCreditorNetCreditLimit(pumpCode).subscribe(res => {
      this.creditLimit = res;
    });
  }
  editUser(creditorInventory: CreditorInventory) {
    creditorInventory.IsEditModal = true;
    creditorInventory.PetrolPumpCode = this.pumpCode;
    const dialogRef = this.dialog.open(CreditorFuelRequestFormComponent, {
      data: { creditorInventory:creditorInventory,creditLimit:this.creditLimit }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openAddFuelRequestDialog() {
    let creditorInventory: CreditorInventory = new CreditorInventory();
    creditorInventory.PetrolPumpCode = this.pumpCode;
    creditorInventory.IsEditModal = false;
    const dialogRef = this.dialog.open(CreditorFuelRequestFormComponent, {
      data: { creditorInventory:creditorInventory,creditLimit:this.creditLimit },
      disableClose: true
    });
  }

  getAllRoles() {
    this.userService.getAllRole().subscribe(data => {
      this.roles = data;
    });
  }
  removeUser(i: number) {
    this.pumpUsers.splice(i, 1);
  }

  // ChangePassword(user: pp_User) {
  //   const dialogRef = this.dialog.open(ChangePasswordComponent, {
  //     data: { user }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }
  DeleteUser(user: CreditorInventory) {
    if (confirm("Do you want to delete this fuel request?")) {
      this.userService.deleteFuelRequest(user).subscribe((res: any) => {
        this.toasterService.pop('success', '', res.Result.toString());
        this.router.navigate(['/FuelRequest',this.pumpCode]);
      },
        (err) => {

        });
      

    }
  }
}
