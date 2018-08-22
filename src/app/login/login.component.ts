import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ToasterService } from 'angular2-toaster';
import { AlertService, AuthenticationService } from '../_services';
import { User } from '../_models';
import { UserService } from '../_services';
import { UserInfo } from '../_models/UserInfo';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;    
    submitted = false;
    returnUrl: string;
    // userData: UserInfo;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private toasterService: ToasterService,
        private userService: UserService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required])],
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        // let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // let newUser=new User();
        // newUser.id=users.length + 1;
        // newUser.firstName='Robin';
        // newUser.lastName='Kumar';
        // newUser.username='robin.kumar@algoworks.com';
        // newUser.password='RAC123hi';
        // let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
        // if (duplicateUser==0) {
        //     users.push(newUser);
        //     localStorage.setItem('users', JSON.stringify(users));
        // }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                    if (data && data.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', data.token);
                        if (data.roleID != -2) {
                            this.router.navigate(['/pumpDetails',data.petrolPumpCode]);
                        }
                        else {
                            this.router.navigate([this.returnUrl]);
                        }
                    }

                },
                err => {
                    this.loading = false;
                    throw err;
                });
    }

    // CheckUser() {
    //     this.userService.getUserDetailInfo().subscribe((res) => {
    //         this.userData = res;
    //     },
    //         (err) => {
    //             this.alertService.error(err);
    //         });
    // }
}
