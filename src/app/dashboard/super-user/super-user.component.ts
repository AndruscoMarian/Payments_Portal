import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/dashboard/utilities/users/User';
import { UsersService } from 'src/app/dashboard/utilities/users/UsersSerice';
import { FilePreviewOverlayRef } from '../overlay/file-preview-overlay-ref';
import { FilePreviewOverlayService } from '../overlay/file-preview-overlay.service';
import { UsersUtility } from '../utilities/users-utility/UsersUtility';


import { State } from '../state_users/users_reducer';
import * as UsersActions from '../state_users/users_actions'
import * as UsersSelectors from '../state_users/users_selectors'

@Component({
  selector: 'super-user-component',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.css']
})
export class SuperUserComponent implements OnInit{
  errorMessage: string = '';
  filteredUsers:IUser[]=[];
  users:IUser[]=[];
  userId:number | null = null;

  totalLength!:number;
  page:number = 1;

  usersStatus$!: Observable<string>;
  users$!: Observable<IUser[]>;
  errorMessage$!: Observable<string>;

  private _filterName:string = '';
 
  get filterName():string{
    return this._filterName;
  }
  set filterName(value:string){
    this._filterName = value;
    this.filteredUsers = this.performFilter(value, 'name');
  }
// ---------------------------------------------------------------
  private _filterRole:string = '';
  get filterRole():string{
    return this._filterRole;
  }
  set filterRole(value:string){
    this._filterRole = value;
    this.filteredUsers = this.performFilter(value, 'role');
  }
// ---------------------------------------------------------------
  private _filterPerm:string = '';
  get filterPerm():string{ 
    return this._filterPerm;
  }
  set filterPerm(value:string){
    this._filterPerm = value;
    this.filteredUsers = this.performFilter(value, 'perm');
  }

  constructor(private usersService:UsersService, 
              private usersUtility:UsersUtility,
              private filePreviewOverlayService: FilePreviewOverlayService,
              private route:ActivatedRoute,
              // ngrx
              private store: Store<State>
              ) { }  

  performFilter(filterBy:string, name:string):IUser[]{
    filterBy = filterBy.toLocaleLowerCase();
      return this.users.filter((user:IUser) =>{
        return this.usersUtility.performUsersFilter(filterBy, name, user);
      });
  }

  sortUsers(param:string):void{
    const sortedUsers = this.performSort(param); 
    this.filteredUsers = sortedUsers;
  }

  // sortUsersObservable(param:string):void{
  //   this.sortUserParam = param;
  // }

  performSort(byWhat: string):IUser[]{ 
    return this.users.sort((a:IUser, b:IUser)=>{
      return this.usersUtility.performUsersSort(byWhat, a, b);
   })
  }

  showPreview() {
    let dialogRef: FilePreviewOverlayRef = this.filePreviewOverlayService.open({}, this.userId );
  }

  ngOnInit():void{
    this.usersService.getUsers().subscribe({
      next: users=>{
        this.users = users;
        this.filteredUsers = this.users;
        this.totalLength = users.length;
      },
      error: err => this.errorMessage = err
    });

 // ngrx------------------------------------------ngrx
    this.store.dispatch(UsersActions.loadUsers());
    this.usersStatus$ = this.store.select(UsersSelectors.getUsersStatus); 
    this.users$ = this.store.select(UsersSelectors.getUsersList);
    this.errorMessage$ = this.store.select(UsersSelectors.getUsersError);
 // ngrx------------------------------------------ngrx

    this.route.paramMap.subscribe(
    params => {
        this.userId = Number(params.get('id'));
        if(this.userId){
          this.showPreview();
        }
    });
  }

}


