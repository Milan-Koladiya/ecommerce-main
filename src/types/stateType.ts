import type { IUser } from "./authType";

export interface intialStateType{
    loading:string,
    message:string,
    error:boolean,
    apiName:string,
    alertType:''|'info'|'success'|'danger'|'warning',
    emailStatus?:string,
    profile?:IUser,
    
}