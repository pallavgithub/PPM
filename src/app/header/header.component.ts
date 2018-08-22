import { AlertService } from '../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
  }
  userData: object;
  ngOnInit() {
      this.userData=this.userService.getUserInfo().subscribe((res)=>{
        this.userData=res;
      },
    (err)=>{
      this.alertService.error(err);
    });
    // this.userData = this.userService.getUserInfo().subscribe((res) => {
    //   this.userData = res;
    // });
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(["/login"]);
  }


}
