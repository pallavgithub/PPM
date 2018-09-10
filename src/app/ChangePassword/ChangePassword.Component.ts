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
  selector: 'changePasswordForm',
  templateUrl: './ChangePassword.component.html',
  styleUrls: ['./ChangePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: pp_User;
  roles:Role[];
  btnDisabled:boolean = false;
  changePasswordForm:FormGroup;
  validation_messages = {
    'Password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Only Alphabets, Numbers, @, &, !, -, _ and . are allowed.' }
    ]      
  }
  constructor(private toasterService: ToasterService,public dialog: MatDialog,private router: Router,private userService:UserService,private _formBuilder: FormBuilder,private petrolPumpService:PetrolPumpService,@Inject(MAT_DIALOG_DATA) public data,
  private dialogRef: MatDialogRef<ChangePasswordComponent>) {
    
   }

  ngOnInit() {
    this.user=this.data.user;  
    this.user.Password = "";  
    this.changePasswordForm = this._formBuilder.group({
      ID:[this.user.ID],
      PetrolPumpCode:[this.user.PetrolPumpCode],
      UserId: [this.user.UserId,Validators.compose([ Validators.required,Validators.minLength(5)])],
      Password:[this.user.Password,Validators.compose([ Validators.required,Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9@&!-_.]*$')])],
      FullName: [this.user.FullName,Validators.compose([ Validators.required])],      
      Address: [this.user.Address],
      RoleID: [this.user.RoleID,Validators.compose([ Validators.required])],
      Phone: [this.user.Phone],
      Email: [this.user.Email],
      CreditLimit: [this.user.CreditLimit],
      Description: [this.user.Description]
});
  }

  ChangePassword(){
    this.petrolPumpService.ChangeUserPassword(this.changePasswordForm.value).subscribe((res:any)=>{
      this.toasterService.pop('success','',res.Result.toString());
      this.dialogRef.close();
      this.router.navigate(['/pumpDetails',this.user.PetrolPumpCode]);
    });
    
  }
}
