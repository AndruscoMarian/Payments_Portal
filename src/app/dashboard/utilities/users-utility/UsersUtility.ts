import { AbstractControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { IUser } from "../users/User";


export class UsersUtility {
    
    performUsersFilter(filterBy:string, name:string, user:IUser):boolean{
        switch(name){
            case 'name':
              const full_name:string = user.first_name + user.last_name;
              return full_name.toLocaleLowerCase().includes(filterBy)
         
            case 'role':
              return user.role.toLocaleLowerCase().includes(filterBy)
           
            case 'perm':
              return user.permissions.toLocaleLowerCase().includes(filterBy)
      
            default:
              return true
          }
        
    };

    performUsersSort(byWhat:string, a:IUser, b:IUser):number{
      switch(byWhat){

        case 'nameDown':
          if(a.first_name.toLocaleLowerCase() < b.first_name.toLocaleLowerCase()){ 
            return -1
          }else if(a.first_name.toLocaleLowerCase() > b.first_name.toLocaleLowerCase()){
            return 1
          }else{
            return 0;
          }
        case 'nameUp':
          if(a.first_name.toLocaleLowerCase() > b.first_name.toLocaleLowerCase()){ 
            return -1
          }else if(a.first_name.toLocaleLowerCase() < b.first_name.toLocaleLowerCase()){
            return 1
          }else{
            return 0;
          }

        case 'roleDown':
          if(a.role.toLocaleLowerCase() < b.role.toLocaleLowerCase()){ 
            return -1
          }else if(a.role.toLocaleLowerCase() > b.role.toLocaleLowerCase()){
            return 1
          }else{
            return 0;
          }
        case 'roleUp':
          if(a.role.toLocaleLowerCase() > b.role.toLocaleLowerCase()){ 
            return -1
          }else if(a.role.toLocaleLowerCase() < b.role.toLocaleLowerCase()){
            return 1
          }else{
            return 0;
          }

        case 'permDown':
          if(a.permissions.toLocaleLowerCase() < b.permissions.toLocaleLowerCase()){ 
            return -1
          }else if(a.permissions.toLocaleLowerCase() > b.permissions.toLocaleLowerCase()){
            return 1
          }else{
            return 0;
          }
        case 'permUp':
          if(a.permissions.toLocaleLowerCase() > b.permissions.toLocaleLowerCase()){ 
            return -1
          }else if(a.permissions.toLocaleLowerCase() < b.permissions.toLocaleLowerCase()){
            return 1
          }else{
            return 0;
          }

        default:
          return 0
        }   
    };

    performSetMessage(c:AbstractControl | null, 
                      message:Record<string,string>, 
                      validation:Record<string,string>):void{
      c?.valueChanges.pipe(debounceTime(1000)).subscribe(
        value => {
            message.finalMessage = '';
            if((c.touched || c.dirty) && c.errors){
              message.finalMessage = Object.keys(c.errors).map(
                key => validation[key]).join(' ');
            }
        }
      );      
    };

};

