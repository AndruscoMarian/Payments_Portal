import {  Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../utilities/users/User';
import { UsersService } from '../utilities/users/UsersSerice';

import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UsersUtility } from '../utilities/users-utility/UsersUtility';
import { FilePreviewOverlayRef } from '../overlay/file-preview-overlay-ref';

@Component({
  selector: 'super-user-detail-component',
  templateUrl: './super-user-detail.component.html',
  styleUrls: ['./super-user-detail.component.css']
})

export class SuperUserDetailComponent implements OnInit {

  userForm!: FormGroup;  
  errorMessage: string = '';
  user!:IUser;
  @Input() userID!:number|null;


// ------------------Start Set message------------
  message = {
    firstNameMessage: {finalMessage:''},
    lastNameMessage: {finalMessage:''},
    emailMessage: {finalMessage:''},
    roleMessage: {finalMessage:''},
    permissionsMessage: {finalMessage:''},
  };

  private validation = {
    firstNameValidation: {
      required:'The first name is required',
      minlength:'The minimum length is not accomplished'
    },
    lastNameValidation: {
      required:'The last name is required',
      minlength:'The minimum length is not accomplished'
    },
    emailValidation: {
      required:'The email is required',
      email:'The format is incorrect'
    },
    roleValidation: {
      required:'The role is required',
      minlength:'The minimum length is not accomplished'
    },
    permissionsValidation: {
      required:'The permission level is required',
    }
  };
// ------------------End Set message------------

  constructor(private usersService:UsersService, 
              private fb:FormBuilder,
              private usersUtility:UsersUtility,
              private filePreviewOverlayRef: FilePreviewOverlayRef,
              ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name:[
        {value: "", disabled:false},
        [Validators.required, Validators.minLength(3)]
      ],
      last_name:[
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      email:[
        '',
        [Validators.required, Validators.email]
      ],
      role:[
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      permissions:[
        '',
        [Validators.required,]
      ]
    });

    this.usersService.getUser(this.userID).subscribe({
      next: (user:IUser) =>{
        this.user = user;
        this.setUserFormValues(user);
        this.setUserFormMessages();
      },
      error: err => this.errorMessage = err
    });
  };

  saveUser():void{
    if(this.userForm.valid){
      const user = {...this.user, ...this.userForm.value};
      this.usersService.updateUsers(user).subscribe({
        next: () => this.onSaveComplete(),
        error: err => this.errorMessage = err,
      });
      this.showPreview();
    }else{
      this.errorMessage = 'Please correct the validation errors.';
    }
  };

  deleteUser():void{
    if(confirm(`Really delete this user: ${this.user.first_name}?`)){
      this.usersService.deleteUser(this.user.id).subscribe({
        next: ()=> this.onSaveComplete(),
        error: err => this.errorMessage = err,
      });
      this.showPreview();
    }
  };

  onSaveComplete():void{
    this.userForm.reset();
  };

  setUserFormValues(user:IUser):void{
    const {first_name, last_name, email, role, permissions} = user;
    this.userForm.get('first_name')?.setValue(first_name);
    this.userForm.get('last_name')?.setValue(last_name);
    this.userForm.get('email')?.setValue(email);
    this.userForm.get('role')?.setValue(role);
    this.userForm.get('permissions')?.setValue(permissions);
  }

  setUserFormMessages():void{
    this.usersUtility.performSetMessage(this.userForm.get('first_name'), this.message.firstNameMessage,  this.validation.firstNameValidation);                          
    this.usersUtility.performSetMessage(this.userForm.get('last_name'),  this.message.lastNameMessage,   this.validation.lastNameValidation);
    this.usersUtility.performSetMessage(this.userForm.get('email'),      this.message.emailMessage,      this.validation.emailValidation);
    this.usersUtility.performSetMessage(this.userForm.get('role'),       this.message.roleMessage,       this.validation.roleValidation);
    this.usersUtility.performSetMessage(this.userForm.get('permissions'),this.message.permissionsMessage,this.validation.permissionsValidation);
  }

  showPreview():void {
    this.filePreviewOverlayRef.close();
  }

};
