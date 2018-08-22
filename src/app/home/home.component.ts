import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AlertService } from '../_services';
import { Router } from '@angular/router';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { ToasterService } from 'angular2-toaster';

@Component(
    {
        templateUrl: 'home.component.html',
        styleUrls: ['./home.component.css']
    },
)
export class HomeComponent implements OnInit {
    currentUser: User;
    pumpList: object[];

    constructor(private petrolPumpService: PetrolPumpService, private router: Router, private alertService: AlertService, private toasterService: ToasterService) {
        this.getPumpList();
    }

    ngOnInit() {

    }

    getPumpList() {
        this.petrolPumpService.petrolPumpList().subscribe(data => {
            this.pumpList = data;
        });
    }
    getPumpDetails() {

    }
}