import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../utilities/users/User';
import { UsersService } from '../utilities/users/UsersSerice';


@Component({
  selector: 'user-profile-components',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm!: FormGroup; //form model
  // emailMessage!: string;
  user!:IUser;
  profilePicture!: string;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private usersService:UsersService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: [
        {value: "", disabled:false},
        [Validators.required, Validators.minLength(3)]
      ],
      last_name: [
        '', 
        [Validators.required, Validators.minLength(3)]
      ],
      role: [
        '', 
        [Validators.required, Validators.maxLength(25)]
      ],
      email: [
        '', 
        [Validators.required, Validators.email]
      ],
      password: [
        {value: "", disabled:true},
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      ],
      changePassword: this.fb.group({
        newPassword: [
          '', 
          [Validators.minLength(9), Validators.maxLength(9)]
        ],
        confirmedPassword: [
          '', 
          [Validators.minLength(9), Validators.maxLength(9)]
        ],
      }),
    })

    // this.profileForm.get('firstName')?.valueChanges.subscribe(
    //   value => console.log(value)
    // )

    this.usersService.getUser(1007).subscribe({
      next: (user:IUser) => {
        this.user = user;
        this.setFormValues(user);
      }
    });
  }

  setFormValues(user:IUser):void{
    const {first_name, last_name, email, role, password, profile_picture} = user;
    this.profileForm.get('first_name')?.setValue(first_name);
    this.profileForm.get('last_name')?.setValue(last_name);
    this.profileForm.get('role')?.setValue(role);
    this.profileForm.get('email')?.setValue(email);
    this.profileForm.get('password')?.setValue(password);
    this.profilePicture = profile_picture;
  }


  save():void{
    if(this.profileForm.valid){
      const user = {...this.user, ...this.profileForm.value};
      this.usersService.updateUsers(user).subscribe({
        next: () => {},
        error: err => this.errorMessage = err,
      });
    }else{
      this.errorMessage = 'Please correct the validation errors.';
    }
  };
}
