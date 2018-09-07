
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
import { CreditorFuelRequestReceivedFormComponent } from '../creditorFuelRequestReceivedForm/creditorFuelRequestReceivedForm.component';
import { UserDetail } from '../_models/userDetail';
import { UserInfo } from '../_models/UserInfo';

@Component({
  selector: 'pump-creditorFuelRequestReceived',
  templateUrl: './creditorFuelRequestReceived.component.html',
  styleUrls: ['./creditorFuelRequestReceived.component.css']
})
export class CreditorFuelRequestReceivedComponent implements OnInit {
  // @Input() pumpUsers: pp_User[];
  // @Input() pumpCode: string;

  public pumpUsers: CreditorInventory[];
  public pumpCode: string;
  public userData:UserInfo;
  navigationSubscription;
  public ApprovalCode:string;

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


  ngOnInit() {
    if (this.pumpCode && this.pumpCode != '') {
      //this.getUserInfo();
      this.getPumpInfo(this.pumpCode);
      this.getUserDate();
    }
    //this.getAllRoles();
  }
  getPumpInfo(pumpCode) {
    this.petrolPumpService.getPetrolPumpCreditorInventoryReceived(pumpCode).subscribe(res => {
      this.pumpUsers = res;
    });
  }
  editUser(creditorInventory: CreditorInventory) {
    creditorInventory.IsEditModal = true;
    creditorInventory.PetrolPumpCode = this.pumpCode;
    this.ApprovalCode = creditorInventory.SMSCode;
    creditorInventory.SMSCode = '';    
    const dialogRef = this.dialog.open(CreditorFuelRequestReceivedFormComponent, {
      data: { creditorInventory : creditorInventory, ApprovalCode:this.ApprovalCode }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openAddFuelRequestDialog() {
    let creditorInventory: CreditorInventory = new CreditorInventory();
    creditorInventory.PetrolPumpCode = this.pumpCode;
    creditorInventory.IsEditModal = false;
    const dialogRef = this.dialog.open(CreditorFuelRequestReceivedFormComponent, {
      data: { creditorInventory:creditorInventory },
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
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res)=>{
      this.userData=res;
    });
}
  DeleteUser(user: CreditorInventory) {
    if (confirm("Do you want to delete this fuel request?")) {
      this.userService.deleteFuelRequest(user).subscribe((res: any) => {
        this.toasterService.pop('success', '', res.Result.toString());
        this.router.navigate(['/FuelRequestReceived',this.pumpCode]);
      },
        (err) => {

        });
      

    }
  }
}
