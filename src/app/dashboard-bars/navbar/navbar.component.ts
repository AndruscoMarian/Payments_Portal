import { Component} from '@angular/core';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  dropDownSH:boolean = false;
  dropDownString: string = '';

  toggleDropDown():void{
    this.dropDownSH = !this.dropDownSH;
    this.dropDownString = String(this.dropDownSH)
  }
 
}
