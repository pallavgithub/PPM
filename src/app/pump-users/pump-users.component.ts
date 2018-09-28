
import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { pp_User } from '../_models/pp_User';
import { UserService } from '../_services';
import { Role } from '../_models/Role';
import { UserformComponent } from '../userform/userform.component';
import { ChangePasswordComponent } from '../ChangePassword/ChangePassword.Component';
import { ToasterService } from 'angular2-toaster';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';
import { UserInfo } from '../_models/UserInfo';

@Component({
  selector: 'pump-users',
  templateUrl: './pump-users.component.html',
  styleUrls: ['./pump-users.component.css']
})
export class PumpUsersComponent implements OnInit {
  @Input() pumpUsers: pp_User[];
  @Input() pumpCode: string;
  public userData: UserInfo;
  roles: Role[];
  constructor(private router:Router, private toasterService: ToasterService, public dialog: MatDialog, private userService: UserService,private viewContainerRef: ViewContainerRef) {

  }
  getUserDate() {
    this.userService.getUserDetailInfo().subscribe((res) => {
      this.userData = res;
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
    //this.getAllRoles();
    this.getUserDate();
  }
  editUser(user: pp_User) {
    user.IsEditModal = true;
    const dialogRef = this.dialog.open(UserformComponent, {
      data: { user }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  moveToNext()
  {
    this.viewContainerRef[ '_data' ].componentView.parent.component.selectedTab=5;
  }
  getAllRoles() {
    this.userService.getAllRole().subscribe(data => {
      this.roles = data;
    });
  }
  removeUser(i: number) {
    this.pumpUsers.splice(i, 1);
  }

  ChangePassword(user: pp_User) {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { user }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  DeleteUser(user: pp_User) {
    if (confirm("Do you want to delete this user?")) {
      this.userService.deleteUser(user).subscribe((res: any) => {
        this.toasterService.pop('success', '', res.Result.toString());
        this.router.navigate(['/pumpDetails',this.pumpCode]);
      },
        (err) => {

        });
      

    }
  }
}
