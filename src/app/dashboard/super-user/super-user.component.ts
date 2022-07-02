import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IUser } from 'src/app/dashboard/utilities/users/User';
import { UsersService } from 'src/app/dashboard/utilities/users/UsersSerice';
import { FilePreviewOverlayRef } from '../overlay/file-preview-overlay-ref';
import { FilePreviewOverlayService } from '../overlay/file-preview-overlay.service';
import { getLoadUsers, getLoadUsersError, getShowTestUserComponent, State } from '../state/user.reducer';
import { UsersUtility } from '../utilities/users-utility/UsersUtility';
import * as UsersActions from '../state/user.action';


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

  test: boolean = true;
  users$!: Observable<IUser[]>;
  error$!: Observable<string>;
  // sortUserParam: string = '';


  // users$ = this.usersService.users$
  //   .pipe(
  //     map(i =>  this.users = i),
  //     map(i =>  this.filteredUsers = this.users),
  //     tap(i => console.log('Those are the users: ',i)),
  //     catchError(err => {
  //       this.errorMessage = err;
  //       return EMPTY;
  //     })
  //   );

  // filteredUsers$ = this.usersService.users$
  //   .pipe(
  //     map(users => 
  //       users.filter(user => this.performSort(this.sortUserParam)))
  //   );

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
              private store: Store<State>,
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

  testNgRx(): void{
    this.store.dispatch(UsersActions.toggleUserComponent());
  }

  ngOnInit():void{
    this.usersService.getUsers().subscribe({
      next: users=>{
        this.users = users;
        this.filteredUsers = this.users;
      },
      error: err => this.errorMessage = err
    });

    
    // this.store.dispatch(UsersActions.loadUsers());
    
    // this.users$ = this.store.select(getLoadUsers);

    // this.error$ = this.store.select(getLoadUsersError);

    // unsubscribe
    this.store.select(getShowTestUserComponent).subscribe(
      usersTest => this.test = usersTest
    )
    

    this.route.paramMap.subscribe(
    params => {
        this.userId = Number(params.get('id'));
        if(this.userId){
          this.showPreview();
        }
    });
  }

}


