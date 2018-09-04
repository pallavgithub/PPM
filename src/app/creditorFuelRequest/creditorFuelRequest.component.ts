
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

@Component({
  selector: 'pump-creditorFuelRequest',
  templateUrl: './creditorFuelRequest.component.html',
  styleUrls: ['./creditorFuelRequest.component.css']
})
export class CreditorFuelRequestComponent implements OnInit {
  // @Input() pumpUsers: pp_User[];
  // @Input() pumpCode: string;

  public pumpUsers: CreditorInventory[];
  public pumpCode: string;
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


  ngOnInit() {
    if (this.pumpCode && this.pumpCode != '') {
      //this.getUserInfo();
      this.getPumpInfo(this.pumpCode);
      this.getCreditLimit(this.pumpCode);
    }
    //this.getAllRoles();
  }
  getPumpInfo(pumpCode) {
    this.petrolPumpService.getPetrolPumpCreditorInventory(pumpCode).subscribe(res => {
      this.pumpUsers = res;
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
      data: { creditorInventory }
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
