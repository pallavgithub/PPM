import { AlertService } from '../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services';

@Component({
  selector: 'app-login-header',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
  }
  userData: object;
  ngOnInit() {      
  }
}
