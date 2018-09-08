import { AlertService } from '../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
  }
  userData: object;
  public clock = Date.now();
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
    
    this.tick();
    interval(1000);    
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(["/login"]);
  }

  tick = function() {
    this.clock = Date.now();
  }
}
