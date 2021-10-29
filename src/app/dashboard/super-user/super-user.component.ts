import { Component, OnInit} from '@angular/core';
import { IUser } from 'src/app/shared/user';

@Component({
  selector: 'super-user-component',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.css']
})
export class SuperUserComponent implements OnInit {


  private _filterName:string = '';
  get filterName():string{
    return this._filterName;
  }
  set filterName(value:string){
    this._filterName = value;
    console.log(value);
    this.filteredUsers = this.performFilter(value, 'name');
  }

  private _filterRole:string = '';
  get filterRole():string{
    return this._filterRole;
  }
  set filterRole(value:string){
    this._filterRole = value;
    this.filteredUsers = this.performFilter(value, 'role');
  }

  private _filterPerm:string = '';
  get filterPerm():string{ 
    return this._filterPerm;
  }
  set filterPerm(value:string){
    this._filterPerm = value;
    this.filteredUsers = this.performFilter(value, 'perm');
  }

  filteredUsers:IUser[]=[];

  users:IUser[]=[
    {
      "first_name":"Ana",
      "last_name":"Maria",
      "email":"Ana_Maria@gmail.com",
      "password":"123456789",
      "profile_picture":'../../../assets/b1.jpg',
      "role":"Platform Admin",
      "permissions":"Jonin",
      
    },
    {
      "first_name":"Andrei",
      "last_name":"Raicu",
      "email":"Andrei_Raicu@gmail.com",
      "password":"qweasdzxc",
      "profile_picture":'../../../assets/b2.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"George",
      "last_name":"Rares",
      "email":"George_Rares@gmail.com",
      "password":"wersdfxcv",
      "profile_picture":'../../../assets/b3.jpg',
      "role":"Developer",
      "permissions":"Chunin",
    },
    {
      "first_name":"Dragos",
      "last_name":"Catalin",
      "email":"Dragos_Catalin@gmail.com",
      "password":"ertdfgcvb",
      "profile_picture":'../../../assets/b4.jpg',
      "role":"Developer",
      "permissions":"Chunin",
    },
    {
      "first_name":"Mihai",
      "last_name":"Mihu",
      "email":"Mihai_Mihu@gmail.com",
      "password":"rtyfghvbn",
      "profile_picture":'../../../assets/b5.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"Anastasia",
      "last_name":"Mirela",
      "email":"Anastasia_Mirela@gmail.com",
      "password":"yuihjkbnm",
      "profile_picture":'../../../assets/b6.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"Catalin",
      "last_name":"Para",
      "email":"Catalin_Para@gmail.com",
      "password":"poilkjmnb",
      "profile_picture":'../../../assets/b7.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"Miruna",
      "last_name":"Elisa",
      "email":"Miruna_Elisa@gmail.com",
      "password":"456qweasd",
      "profile_picture":'../../../assets/b8.jpg',
      "role":"Architect",
      "permissions":"Chunin",
    },
    {
      "first_name":"Norbi",
      "last_name":"Adams",
      "email":"Norbi_Adams@gmail.com",
      "password":"678yuibub",
      "profile_picture":'../../../assets/b9.jpg',
      "role":"Designer",
      "permissions":"Chunin",
    },
    {
      "first_name":"Darius",
      "last_name":"Berenghi",
      "email":"Darius_Berenghi@gmail.com",
      "password":"789456123",
      "profile_picture":'../../../assets/b10.jpg',
      "role":"UX/UI Specialist",
      "permissions":"Chunin",
    },
    {
      "first_name":"Mirabela",
      "last_name":"Baciu",
      "email":"Mirabela_Baciu@gmail.com",
      "password":"yuihjk908",
      "profile_picture":'../../../assets/b11.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"Andreea",
      "last_name":"Cretu",
      "email":"Andreea_Cretu@gmail.com",
      "password":"dfgcvbert",
      "profile_picture":'../../../assets/b12.jpg',
      "role":"Tester",
      "permissions":"Chunin",
    },
    {
      "first_name":"Vladimir",
      "last_name":"Ionescu",
      "email":"Vladimir_Ionescu@gmail.com",
      "password":"gjkdlp908",
      "profile_picture":'../../../assets/b13.jpg',
      "role":"Tester",
      "permissions":"Chunin",
    },
    {
      "first_name":"Valentin",
      "last_name":"Caprioreanu",
      "email":"Valentin_Caprioreanu@gmail.com",
      "password":"903d458",
      "profile_picture":'../../../assets/b14.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"Garofita",
      "last_name":"Magdalena",
      "email":"Garofita_Magdalena@gmail.com",
      "password":"lolkikjuj",
      "profile_picture":'../../../assets/b15.jpg',
      "role":"User",
      "permissions":"Genin",
    },
  ]

  users2:IUser[]=[
    {
      "first_name":"Monica",
      "last_name":"Bebe",
      "email":"Monica_Bebe@gmail.com",
      "password":"dghbgtygv",
      "profile_picture":'../../../assets/b16.jpg',
      "role":"Developer",
      "permissions":"Genin",
    },
    {
      "first_name":"Bella",
      "last_name":"Bucur",
      "email":"Bella_Bucur@gmail.com",
      "password":"ijn9ij0ok",
      "profile_picture":'../../../assets/b17.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"Marcus",
      "last_name":"Beregata",
      "email":"Marcurs_Beregata@gmail.com",
      "password":"lkolkolko",
      "profile_picture":'../../../assets/b18.jpg',
      "role":"Developer",
      "permissions":"Genin",
    },
    {
      "first_name":"Ioana",
      "last_name":"Lavinia",
      "email":"Ioana_Lavinia@gmail.com",
      "password":"asadeccer",
      "profile_picture":'../../../assets/b19.jpg',
      "role":"User",
      "permissions":"Genin",
    },
    {
      "first_name":"Stefan",
      "last_name":"Calugar",
      "email":"Stefan_Calugar@gmail.com",
      "password":"999666333",
      "profile_picture":'../../../assets/b20.jpg',
      "role":"Designer",
      "permissions":"Genin",
    },
  ]

  performFilter(filterBy:string, name:string):IUser[]{
    filterBy = filterBy.toLocaleLowerCase();

      return this.users.filter((user:IUser) =>{
        if(name === 'name'){
          const full_name:string = user.first_name + user.last_name;
          return full_name.toLocaleLowerCase().includes(filterBy)

        }else if(name === 'role'){
          return user.role.toLocaleLowerCase().includes(filterBy)

        }else if(name === 'perm'){
          return user.permissions.toLocaleLowerCase().includes(filterBy)

        } else{
          return true
        }
      });
    
  }

  ngOnInit():void{
    this.filterName = ''
  }

  constructor() { }

}
