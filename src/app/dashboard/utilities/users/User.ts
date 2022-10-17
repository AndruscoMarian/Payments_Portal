export interface IUser{
    first_name:string,
    last_name:string,
    id:number,
    email?:string,
    password:any,
    profile_picture:string,
    role:string,
    permissions:string,
    full_name?:string
}