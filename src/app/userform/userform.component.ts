import { UserService } from '../_services/user.service';
import { Component, OnInit,NgModule, Output, EventEmitter, Input, Inject  } from '@angular/core';
import { pp_User } from '../_models/pp_User';
import {FormsModule, FormBuilder, FormGroup, Validators, NgControl} from '@angular/forms'
import { Role } from '../_models/Role';
import { PetrolPumpService } from '../_services/petrolpump.service';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

@Component({
  selector: 'userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  user: pp_User;
  roles:Role[];
  IsEditDialog: boolean;
  btnDisabled:boolean = false;
  userform:FormGroup;
  validation_messages = {    
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],    
    'Password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ],
    'UserId': [
      { type: 'required', message: 'UserId is required' },
      { type: 'minlength', message: 'UserId must be at least 5 characters long' }
    ],
    'FullName': [
      { type: 'required', message: 'Name is required' }
    ],
    'Phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'minlength', message: 'Phone must be at least 10 characters long' },
      { type: 'maxlength', message: 'Phone can be 12 characters long' },
      { type: 'pattern', message: 'Only Numbers are allowed.' }
    ],
    'CreditLimit': [      
      { type: 'pattern', message: 'Only Numbers are allowed.' }
    ]    
  }
  constructor(private toasterService: ToasterService,public dialog: MatDialog,private router: Router,private userService:UserService,private _formBuilder: FormBuilder,private petrolPumpService:PetrolPumpService,@Inject(MAT_DIALOG_DATA) public data,
  private dialogRef: MatDialogRef<UserformComponent>) {
    
   }

  ngOnInit() {
    this.user=this.data.user;
    this.getAllRoles();
    this.userform = this._formBuilder.group({
      ID:[this.user.ID],
      PetrolPumpCode:[this.user.PetrolPumpCode],
      UserId: [this.user.UserId,Validators.compose([ Validators.required,Validators.minLength(5)])],
      Password:[this.user.Password,Validators.compose([ Validators.required,Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9@&!-_.]*$')])],
      FullName: [this.user.FullName,Validators.compose([ Validators.required])],      
      Address: [this.user.Address],
      RoleID: [this.user.RoleID,Validators.compose([ Validators.required])],
      Phone: [this.user.Phone, Validators.compose([ Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern('^[0-9]*$')])],
      Email: [this.user.Email,Validators.compose([Validators.required,Validators.email])],
      CreditLimit: [this.user.CreditLimit, Validators.compose([Validators.pattern('^[0-9]*$')])],
      Description: [this.user.Description],
      isEditModal:[this.user.IsEditModal]
});
if (this.user.IsEditModal) {
  this.IsEditDialog = true;
  this.userform.controls.UserId.disable();
}
else {
  this.IsEditDialog = false;
  this.userform.controls.UserId.enable();
}
this.DisableControlsByRole();
  }

  getAllRoles()
  {
    this.userService.getAllRole().subscribe(data=>{      
      this.roles=data;
    });
  }

  createUser(){
    this.petrolPumpService.addUpdatePumpUser(this.userform.value).subscribe((res:any)=>{
      this.toasterService.pop('success','',res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/pumpDetails',this.user.PetrolPumpCode]);
    });
  }
  
  onChange() {    
    this.DisableControlsByRole();
}

DisableControlsByRole()
{if (this.userform.controls['RoleID'].value=='2') { // 2 for Creditor
  this.userform.controls['CreditLimit'].enable();
}
else{
  this.userform.controls['CreditLimit'].disable();
}
}

PasswordControlsVisbility()
{if (this.userform.controls['isEditModal'].value==true) { 
  return true;
}
else{
  return false;
}
}

}
