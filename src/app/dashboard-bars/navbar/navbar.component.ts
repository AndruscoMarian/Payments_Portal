import { Component, OnInit} from '@angular/core';
import { IUser } from 'src/app/dashboard/utilities/users/User';
import { UsersService } from 'src/app/dashboard/utilities/users/UsersSerice';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  dropDownSH:boolean = false;
  dropDownString: string = '';

  user!:IUser;
  userFullName:string = 'Name Holder'
  profilePicture!: string;
  
  constructor(
    private usersService:UsersService
  ){}

  ngOnInit(): void {
    this.usersService.getUser(1007).subscribe({
      next: (user:IUser) => {
        this.user = user;
        this.userFullName = `${this.user.first_name} ${this.user.last_name}`
        this.profilePicture = this.user.profile_picture
      }
    });
  }

  toggleDropDown():void{
    this.dropDownSH = !this.dropDownSH;
    this.dropDownString = String(this.dropDownSH)
  }

 
}
