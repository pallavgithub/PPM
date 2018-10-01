import { Component, OnInit, Input, ViewContainerRef, ComponentRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { pp_PetrolPump } from '../_models/pp_PetrolPump';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { ToasterService } from 'angular2-toaster';
import { UserDetail } from '../_models/userDetail';
import { pp_User } from '../_models/pp_User';


@Component({
  selector: 'user-pump-info',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css']
})
export class UserProfileComponent implements OnInit {
  public petrolPump: pp_PetrolPump;
  public userData: UserDetail;
  pumpInfoForm: FormGroup;
  pumpUsers: pp_User;
  RoleID:number;
  public pumpCode: string;
  navigationSubscription;
  validation_messages = {
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'FullName': [
      { type: 'required', message: 'Name is required' }
    ],
    'Phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'minlength', message: 'Phone must be at least 10 characters long' },
      { type: 'maxlength', message: 'Phone can be 12 characters long' },
      { type: 'pattern', message: 'Only Numbers are allowed.' }
    ]
  }
  constructor(private toasterService: ToasterService, private _formBuilder: FormBuilder, private router: Router, private petrolPumpService: PetrolPumpService,private viewContainerRef: ViewContainerRef, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pumpCode = params['pumpCode'];
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.petrolPumpService.getPetrolPumpUserInfo(this.pumpCode).subscribe(res => {
      this.pumpUsers = res;
      this.pumpInfoForm = this._formBuilder.group({
        ID: [this.pumpUsers.ID],
        PetrolPumpCode: [this.pumpUsers.PetrolPumpCode],
        UserId: [this.pumpUsers.UserId],
        Password: [this.pumpUsers.Password],
        ConfirmPassword: [this.pumpUsers.ConfirmPassword],
        FullName: [this.pumpUsers.FullName, Validators.compose([Validators.required, Validators.minLength(3)])],
        Address: [this.pumpUsers.Address],
        RoleID: [this.pumpUsers.RoleID],
        Phone: [this.pumpUsers.Phone, Validators.compose([Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^[0-9]*$')])],
        Email: [this.pumpUsers.Email, Validators.compose([Validators.email])],
        CreditLimit: [this.pumpUsers.CreditLimit],
        Description: [this.pumpUsers.Description],
        isEditModal: [this.pumpUsers.IsEditModal]
      });     
    });
    
  }

  createUser() {
    this.petrolPumpService.addUpdatePumpUser(this.pumpInfoForm.value).subscribe((res: any) => {
      this.toasterService.pop('success', '', res.Result.toString());
      this.ngOnInit();
    });
  }
 
}
